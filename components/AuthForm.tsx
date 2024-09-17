'use client'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { useState } from 'react'


const AuthForm = ({type}: {type:string}) => {
  const [user, setUser] = useState(null)
  return (
      <section className="auth-form">
        <header className='flex flex-col gap-5 md:gap-8'>
        <Link
            href='/'
            className='mb-12 cursor-pointer items-center gap-2 flex'
          >
          <Image
            src='/icons/logo.svg'
            width={34}
            height={34}
            alt='Logo'
          />
          <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1' >Neo bank</h1>
          </Link>
          <div className="flex flex-col gap-1 md:gap-3 ">
            <h1>{user
              ? 'Link account'
              : type === 'sign-in'
              ? 'Sign in'
              : 'Sign up'
              }</h1>
          </div>
        </header>
      </section>
  )
}

export default AuthForm
