import { cn } from '@/utils/cn';
import React from 'react';
import { IoMdSearch } from "react-icons/io";

type Props = {
    className?: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
    onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
}

export default function SearchBox(props: Props) {
  return (
    <div>
        {/*search bar */}
        <form 
            onSubmit={props.onSubmit} 
            className={cn(
                "flex relative justify-center h-10 items-center ", 
                props.className)
            }

        >
            <input 
                type="text" 
                value={props.value}
                onChange={props.onChange} 
                placeholder='Search for a city' 
                className='border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none bg-transparent text-lg focus:border-blue-500 h-full w-[230px]'
            />
            <button className='bg-blue-500 text-white rounded-r-md px-4 py-2 cursor-pointer hover:bg-blue-600'>
                <IoMdSearch className='text-2xl'/>
            </button>
        </form>
    </div>
  )
}