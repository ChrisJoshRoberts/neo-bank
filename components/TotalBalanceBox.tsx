import React from 'react'

const TotalBalanceBox = ({accounts=[], totalBanks, totalCurrentBalance}: TotlaBalanceBoxProps) => {
  return (
    <section className='total-balance'>
      <div className='total-balance-chart'>
        {/* Doughnut Chart */}

      </div>
      <div className="flex flex-col gap-6">
        <h2 className="header-2">
        Bank accounts: {totalBanks}
        </h2>
        <div className="flex flex-col gap-2">
          <p className='total-balance-label'>
            Total current balance
          </p>
          <p className='total-balance-amount'>
            
          </p>
        </div>
      </div>
    </section>
  )
}

export default TotalBalanceBox
