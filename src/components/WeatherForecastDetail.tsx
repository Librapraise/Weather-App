import React from 'react'
import Container from './Container'
import WeatherDetails, { WeatherDetailsProps } from './WeatherDetails'
import WeatherIcon from './WeatherIcon';
import convertKelvinTOCelsius from '@/utils/convertKelvinTOCelsius';


export interface WeatherForecastDetailProps extends WeatherDetailsProps{
  weatherIcon: string;
  feelsLike: number;
  temp: number;
  description: string;
  day: string;
  date: string;
  temp_min: number;
  temp_max: number;
  className?: string;
}


export default function WeatherForecastDetail(props: WeatherForecastDetailProps) {
  const {
    weatherIcon = '01d',
    feelsLike = 25,
    temp = 25,
    description = 'Clear Sky',
    day = 'Monday',
    date = '2021-09-20',
    temp_min = 25,
    temp_max = 25,
  } = props;

  return (
    <Container className='gap-4'>
        {/* left */}
        <section className="flex items-center gap-4">
          <div className='flex flex-col items-center'>
            <WeatherIcon iconName={weatherIcon} />
            <p className="text-xs whitespace-nowrap">{date}</p>
            <p className="whitespace-nowrap text-xs font-semibold">{day}</p>
          </div>

          {/* Weather Details */}
          <div className='flex flex-col px-4'>
            <p className="text-4xl whitespace-nowrap">{convertKelvinTOCelsius(temp ?? 0)}°C</p>
            <p className='text-xs whitespace-nowrap'>Feels like {convertKelvinTOCelsius(feelsLike ?? 0)}°C</p>
            <p className="text-xs space-x-2 whitespace-nowrap">
              <span>{convertKelvinTOCelsius(temp_min ?? 0)}°C↓</span>
              <span>{convertKelvinTOCelsius(temp_max ?? 0)}°C↑</span>
            </p>
            <p className="text-xs whitespace-nowrap capitalize">{description}</p>
          </div>
        </section>

        {/* right */}
        <section className="flex overflow-x-auto scrollbar-hide gap-4 justify-between w-full cursor-pointer px-4 pr-10"> 
          <WeatherDetails {...props} />
        </section>
    </Container>
  )
}