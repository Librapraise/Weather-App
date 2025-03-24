import React from 'react'
import { TbWind } from "react-icons/tb";
import { FiDroplet } from "react-icons/fi";
import { WiBarometer } from "react-icons/wi";
import { MdOutlineVisibility } from "react-icons/md";
import { FiSunrise } from "react-icons/fi";
import { FiSunset } from "react-icons/fi";


{/* SingleWeatherDetails */}
export interface SingleWeatherDetailsProps {
    information: string;
    icon: React.ReactNode;
    value: string | number;
}

export function SingleWeatherDetails(props: SingleWeatherDetailsProps) {
    return (
        <div className="flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black/80">
            <p className="whitespace-nowrap">{props.information}</p>
            <div className="text-3xl">{props.icon}</div>
            <p>{props.value}</p>
      </div>
    )

}


type Props = {}

{/* Full WeatherDetails */}

export interface WeatherDetailsProps {
    visibility: string;
    windSpeed: string;
    humidity: string;
    airPressure: string;
    sunrise: string;
    sunset: string;
}

export default function WeatherDetails(props: WeatherDetailsProps) {

    const {
        visibility = "25km", 
        windSpeed = "2.3m/s", 
        humidity = "61%", 
        airPressure = "1012hpa", 
        sunrise = "6:00AM", 
        sunset ="18:00PM",
    } = props;

  return (
    <div className='flex gap-2 items-center justify-between overflow-x-auto scrollbar-hide w-full cursor-pointer pr-2'>
        <SingleWeatherDetails 
            information="Wind Speed" 
            icon={<TbWind />} 
            value={windSpeed}
        />
        <SingleWeatherDetails 
            information="Humidity" 
            icon={<FiDroplet />} 
            value={humidity}
        />
        <SingleWeatherDetails 
            information="Air Pressure" 
            icon={<WiBarometer />} 
            value={airPressure}

        />
        <SingleWeatherDetails   
            information="Visibility" 
            icon={<MdOutlineVisibility />} 
            value={visibility}      
        />
        <SingleWeatherDetails   
            information="Sunrise" 
            icon={<FiSunrise />} 
            value={sunrise}        
        />
        <SingleWeatherDetails   
            information="Sunset" 
            icon={<FiSunset />} 
            value={sunset}    
        />
        
    </div>
  )
}


// export function SingleWeatherDetails(props: SingleWeatherDetailsProps) {
//     return (
//         <div className='flex flex-col items-center justify-between font-semibold text-black/80 gap-2'>
//             <div className="flex gap-4 flex-col items-center">  
//                 <p className="text-xs font-semibold">Wind Speed</p>
//                 <TbWind className="text-3xl" />
//                 <p className="text-xs">{todayWeather?.wind.speed} m/s</p>
//             </div>
//             <div className="flex gap-4 flex-col items-center">
//                 <p className="text-xs font-semibold">Humidity</p>
//                 <FiDroplet className="text-3xl" />
//                 <p className="text-xs">{todayWeather?.main.humidity}%</p>
//             </div>
//             <div className="flex gap-4 flex-col items-center">
//                 <p className="text-xs font-semibold">Air Pressure</p>
//                 <WiBarometer className="text-3xl" />
//                 <p className="text-xs">{todayWeather?.main.pressure} hPa</p>
//             </div>
//             <div className="flex gap-4 flex-col items-center">
//                 <p className="text-xs font-semibold">Visibility</p>
//                 <MdOutlineVisibility className="text-3xl" />
//                 <p className="text-xs">{todayWeather?.visibility ?? 0 / 1000} km</p>
//             </div>
//             <div className="flex gap-4 flex-col items-center">
//                 <p className="text-xs font-semibold">Sunrise</p>
//                 <FiSunrise className="text-3xl" />
//                 <p className="text-xs">{format(parseISO(todayWeather?.dt_txt ?? ''), 'HH:mm a')}</p>
//             </div>
//             <div className="flex gap-4 flex-col items-center">
//                 <p className="text-xs font-semibold">Sunset</p>
//                 <FiSunset className="text-3xl" />
//                 <p className="text-xs">{format(parseISO(todayWeather?.dt_txt ?? ''), 'HH:mm a')}</p>
//             </div>
//         </div>
//     )
// }
