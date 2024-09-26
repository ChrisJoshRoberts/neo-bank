'use server'

import { ID } from 'node-appwrite'
import { createSessionClient, createAdminClient } from '../appwrite'
import { cookies } from 'next/headers'
import { encryptId, parseStringify } from '../utils'
import { CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, Products } from 'plaid'
import { plaidClient } from '@/lib/plaid'
import { revalidatePath } from 'next/cache'

export const signIn = async ({email, password}: signInProps) => {
  try {
    const { account } = await createAdminClient();
    const response = await account.createEmailPasswordSession(email, password)
    return parseStringify(response)
  } catch (error) {
    console.error("Error", error)
  }
}

export const signUp = async (userData: SignUpParams) => {
  const { email, password, firstName, lastName } = userData;
  try {
    // Create a user account
    const { account } = await createAdminClient();
    const newUserAccount = await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);
    const session = await account.createEmailPasswordSession(email, password);
    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    return parseStringify(newUserAccount);
  } catch (error) {
    console.error("Error", error)
  }
}
export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();

    const user = await account.get();

    return parseStringify(user);
  } catch (error) {
    console.log(error)
    return null;
  }
}

export async function logoutAccount() {
  try {
    const { account } = await createSessionClient();
    cookies().delete("appwrite-session");
    await account.deleteSession("current");
  } catch (error) {
    return null;
  }
}

export const createLinkToken = async (user: User) => {
  try {
    const tokenParams = {
      user: {
          client_user_id: user.$id,
        },
      client_name: user.name,
      products: ['auth'] as Products[],
      country_codes: ['US'] as CountryCode[],
      language: 'en',
      }
      const response = await plaidClient.linkTokenCreate(tokenParams);
      return parseStringify({linkToken: response.data.link_token});

    } catch (error) {
    console.error("Error", error)
  }
}

export const exchangePublicToken = async ({publicToken, user}: exchangePublicTokenProps) => {
  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });
    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;
    const accountResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });
    const accountData = accountResponse.data.accounts[0];
    // Create proccesor token
    const request: ProcessorTokenCreateRequest = {
      access_token: accessToken,
      account_id: accountData.account_id,
      processor: 'dwolla' as ProcessorTokenCreateRequestProcessorEnum,
    }
    const proccesorTokenResponse = await plaidClient.processorTokenCreate(request);
    const processorToken = proccesorTokenResponse.data.processor_token;
    // Create a funding source url for an account using the dwolla customer id, processor token, and bank name.
    const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId: user.dwollaCustomerId,
      processorToken,
      bankName: accountData.name,
    });
    // If the funding source url is not created, return an error.
    if (!fundingSourceUrl) throw Error;
    // Create a new bank account if funding source url is created.
    await createBankAccount({
      userId: user.$id,
      bankId: itemId,
      accountId: accountData.account_id,
      accessToken,
      fundingSourceUrl,
      sharableId: encryptId(accountData.account_id),
    });
    //Revalidate the path to reflect the changes
    revalidatePath('/')
    //Return a success message
    return parseStringify({publicTokenExchange: 'complete'});
  } catch (error) {
    console.error("Error", error)
  }
}
