import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { PlaidLinkOnSuccess } from 'react-plaid-link'
import { createLinkToken } from '@/lib/actions/user.actions'


const PlaidLink = ({user, variant}: PlaidLinkProps) => {
  const router = useRouter()
  const [token, setToken] = useState('')
  useEffect(() => {
    const getLinkToken = async() => {
      const data = await createLinkToken(user)
      setToken(data?.linkToken)
    }
    getLinkToken()
  }, [])
  const onSuccess = useCallback<PlaidLinkOnSuccess>(async(public_token: string) => {
    // await exchangePublicToken({
    //   publicToken: public_token,
    //   user,
    // })
    router.push('/')
  }, [user])
  const config: PlaidLinkOptions = {
    token,
    onSuccess
  }

  const { open, ready } = usePlaidLink(config)

  return (
    <>
    {variant === 'primary' ? (
      <Button
      onClick={()=> open()}
      disabled={!ready}
      className='plaidlink-primary'
      >
        Connect your bank account
      </Button>
    ) : variant === 'ghost' ? (
      <Button>
        Connect your bank account
      </Button>
    ) : (
      <Button>
        Connect your bank account
      </Button>
    )}
    </>
  )
}

export default PlaidLink
