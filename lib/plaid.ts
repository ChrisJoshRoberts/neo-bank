import { Configuration, PlaidApi, PlaidEnviroments } from "plaid";

const configuration = new Configuration({
  basePath: PlaidEnviroments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    }
  }
})

export const plaidClient =  new PlaidApi(configuration);
