import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const RightSidebar = ({user, transactions,banks}:RightSidebarProps) => {
  return (
    <aside className='right-sidebar'>
      <section className='flex flex-col pb-8 '>
        <div className="profile-banner">
        </div>
        <div className="profile">
          <div className="profile-img">
            <span className='text-5xl font-bold text-blue-500'>{user?.firstName ? user.firstName[0] : 'A'}</span>
          </div>
          <div className="profile-details">
            <h1 className='profile-name'>{user.firstName} {user.lastName}</h1>
            <p className='profile-email'>{user.email}</p>
          </div>
        </div>
      </section>
      <section className='banks'>
        <div className="flex w-full justify-between">
          <h2 className="header-2">
            My banks
          </h2>
          <Link
            href='/'
            className=' flex gap-2'
          >
            <Image
            width={20}
            height={20}
            src='/icons/plus.svg'
            alt='Add bank'
            />
            <h2 className="text-14 font-semibold text-gray-600">Add bank</h2>
          </Link>
        </div>
        {banks?.length > 0 && (
          <div className='relative flex flex-1 items-center flex-col justify-center gap-5'>
            <div className="relative z-10">
              Bank card 1
            </div>
            {banks[1] && (
              <div className="absolute right-0 top-8 z-0 w-[90%]">
                Bank card 2
              </div>
            )}
          </div>
        )}
      </section>
    </aside>
  )
}

export default RightSidebar
