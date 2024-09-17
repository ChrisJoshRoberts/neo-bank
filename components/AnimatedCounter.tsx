"use client"
import React from 'react'
import Counter from 'react-countup'

const AnimatedCounter = ({amount}: {amount: number}) => {
  return (
    <div className="w-full">
      <Counter end={amount} duration={2} decimals={2} prefix="$" />
    </div>
  )
}

export default AnimatedCounter
