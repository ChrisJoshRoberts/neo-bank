import React from 'react'
import HeaderBox from '@/components/HeaderBox'

const Home = () => {
  return (
    <div className='home'>
      <div className="home-content">
        <header className='home-header'>
          <HeaderBox
            type="greeting"
            title="Welcome"
            user=""
          />
        </header>
      </div>
    </div>
  )
}

export default Home
