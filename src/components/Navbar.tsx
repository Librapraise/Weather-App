import React from 'react'
import { MdSunny } from 'react-icons/md'
import { MdMyLocation } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import SearchBox from './SearchBox';


type Props = {}

function Navbar({}: Props) {
  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
        <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
            <p className='flex items-center justify-center gap-2'>
                <h2 className='text-3xl text-gray-500'>Weather </h2>
                <MdSunny className='text-3xl text-yellow-300'/>
            </p>

            <section className='flex gap-2 items-center'>
                <MdMyLocation className='text-2xl text-gray-400 hover:opacity '/>
                <MdOutlineLocationOn className='text-2xl text-gray-500'/>
                <p className='text-slate-900/80 text-sm'> Lagos </p>

                {/*search bar */}
                <div className="className">
                    {/*search bar */}
                    <SearchBox 
                        value=''
                        onChange={undefined}
                        onSubmit={undefined}
                    />
                </div>
            </section>
        </div>

    </nav>
  )
}

export default Navbar