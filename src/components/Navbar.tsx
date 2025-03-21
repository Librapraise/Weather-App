import React from 'react'
import { MdSunny } from 'react-icons/md'

type Props = {}

function Navbar() {
  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
        <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
            <p className='flex items-center justify-center gap-2'>
                <h2 className='text-3xl text-gray-500'>Weather </h2>
                <MdSunny className='text-3xl text-yellow-300'/>
            </p>
        </div>

    </nav>
  )
}

export default Navbar