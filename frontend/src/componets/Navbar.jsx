import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-orange-500 flex justify-between'>
        <h1 className='font-sans text-white ml-5 p-3 text-lg font-bold text-2xl'>E-sandhai</h1>
        <div className='mr-5 p-3'><button>signin</button></div>
    </div>
  )
}

export default Navbar