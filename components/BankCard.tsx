import React from 'react'
import Link from 'next/link'
import { formatAmount } from '@/lib/utils'
import Image from 'next/image'

const BankCard = ({account, userName, showBalance = true}: CreditCardProps  ) => {
  return (
    <div className='flex flex-col'>
      <Link className='bank-card' href='/'>
        <div className="bank-card_content">
          <div>
            <h1 className='text-16 font-semibold text-white'>
              {account.name || userName}
            </h1>
            <div className="font-ibm-plex-seritf text-white">
              {formatAmount(account.currentBalance)}
            </div>
          </div>
          <article className='flex flex-col gap-2'>
            <div className='flex justify-between'>
              <h1 className='text-12 text-white font-semibold'>
                {userName}
              </h1>
              <h2 className='text-12 text-white font-semibold'>
              ●●/●●
              </h2>
            </div>
            <p className='text-14 font-semibold tracking-[1.1px] text-white'>
            ●●●● ●●●● ●●●● <span className='text-16'>{account?.mask ? account.mask : '1234'}</span>
            </p>
          </article>
        </div>
        <div className="bank-card_icon">
          <Image
            src='/icons/Paypass.svg'
            width={20}
            height={20}
            alt="Paypass"
          />
          <Image
            src="/icons/mastercard.svg"
            width={45 }
            height={32}
            alt="Mastercard"
            className='ml-5'
          />
        </div>
        <Image
          src="/icons/lines.png"
          width={316}
          height={190}
          alt="Lines"
          className='absolute top-0 left-0'
        />
      </Link>
    </div>
  )
}

export default BankCard
