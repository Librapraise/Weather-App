import React from 'react'
import Image from 'next/image'
import { cn } from '@/utils/cn'


export default function WeatherIcon(props: React.HTMLProps<HTMLDivElement> & {iconName: string}) {
  //const iconName = '01d'
  return (
    <div {...props} className={cn('relative h-20 w-20')}>
        <Image
            src={`http://openweathermap.org/img/wn/${props.iconName}@4x.png`}
            alt='Weather-icon'
            width={100}
            height={100}    
            className='absolute w-full h-full'
        />  
    </div>  
  )
}