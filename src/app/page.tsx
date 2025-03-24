"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format, fromUnixTime, parseISO } from "date-fns";
import Container from "@/components/Container";
import convertKelvinTOCelsius from "@/utils/convertKelvinTOCelsius";
import { FaCloudSun } from "react-icons/fa";
import WeatherIcon from "@/components/WeatherIcon";
import WeatherDetails from "@/components/WeatherDetails";
import metersToKilometers from "@/utils/metersToKilometers";
import convertSpeed from "@/utils/convertSpeed";
import WeatherForecastDetail from "@/components/WeatherForecastDetail";



// API Endpoint
const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=abuja&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=20`;

type WeatherData = {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherEntry[];
  city: City;
};

type WeatherEntry = {
  dt: number;
  main: MainWeather;
  weather: WeatherDescription[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: Sys;
  dt_txt: string;
};

type MainWeather = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
};

type WeatherDescription = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type Clouds = {
  all: number;
};

type Wind = {
  speed: number;
  deg: number;
  gust: number;
};

type Sys = {
  pod: string;
};

type City = {
  id: number;
  name: string;
  coord: Coordinates;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
};

type Coordinates = {
  lat: number;
  lon: number;
};

export default function Home() {
  const { isPending, error, data } = useQuery<WeatherData>({
    queryKey: ["weatherData"],
    queryFn: async () => {
      const response = await axios.get<WeatherData>(API_URL);
      return response.data;
    },
  });

  const todayWeather = data?.list[0];
  const weeklyWeather = data?.list.slice(1);


  const uniqueDates = [
    ...new Set(
      data?.list.map(
        (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    )
  ];

  // Filtering data to get the first entry after 6 AM for each unique date
  const firstDataForEachDate = uniqueDates.map((date) => {
    return data?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });



  if (isPending)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <FaCloudSun className="text-6xl text-gray-500 animate-pulse scale-110 transition-transform duration-500 ease-in-out" />
      </div>
    );
  
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 pb-10 pt-4 w-full">
        {/*today weather forecast */}
        <section className="flex flex-col gap-4 space-y-4">
          <div className="space-y-2">
            <h1 className="flex gap-1 text-2xl items-end">
              <p className="font-semibold"> {format(parseISO(todayWeather?.dt_txt ?? ''), 'EEEE')}</p>
              <p>({format(parseISO(todayWeather?.dt_txt ?? ''), 'dd.MM.yyyy')})</p>
            </h1>

            <Container className="gap-10 px-6 items-center">
              {/* Weather */}
              <div className="flex flex-col px-4">
                <span className="text-5xl"> 
                  {convertKelvinTOCelsius(todayWeather?.main.temp ?? 0)}°C
                </span>
                <p className="text-xs space-x-1 whitespace-nowrap">
                  Feels like {convertKelvinTOCelsius(todayWeather?.main.feels_like ?? 0)}°C
                </p>

                <p className="text-xs space-x-2 whitespace-nowrap">
                  <span>{convertKelvinTOCelsius(todayWeather?.main.temp_min ?? 0)}°C↓</span>
                  <span>{convertKelvinTOCelsius(todayWeather?.main.temp_max ?? 0)}°C↑</span>
                </p>
              </div>

              {/* Weather Description & Time */}
              <div className="flex gap-10 sm:gap-16 justify-between overflow-x-auto scrollbar-hide w-full cursor-pointer pr-2">
                {data?.list.map((weather, index) => (
                  <div key={index} className="flex flex-col items-center justify-between font-semibold gap-2">
                    <p className="text-xs text-center whitespace-nowrap">{format(parseISO(weather.dt_txt), 'HH:mm a')}</p>
                    <WeatherIcon iconName={weather.weather[0].icon} />
                    <p className="text-xs text-center whitespace-nowrap">{convertKelvinTOCelsius(weather.main.temp)}°C</p>
                    <p className="text-xs text-center whitespace-nowrap">{weather.weather[0].description}</p>
                  </div>
                ))}
              </div>
            </Container>

            {/* Weather Details */}
            <div className="flex gap-4">  
              {/* left */}
              <Container className="w-fit justify-center items-center flex-col px-4">
                <p className="text-xs whitespace-nowrap font-semibold">{todayWeather?.weather[0].description}</p>
                <WeatherIcon iconName={todayWeather?.weather[0].icon ?? ""} />
              </Container>

              {/* right */}
              <Container className="bg-blue-300/80 px-6 gap-4 justify-between overflow-x-auto ">
                <WeatherDetails 
                  windSpeed={convertSpeed(todayWeather?.wind.speed ?? 1.64)}
                  humidity={`${todayWeather?.main.humidity}%`}
                  airPressure={`${todayWeather?.main.pressure} hPa`}
                  visibility={metersToKilometers(todayWeather?.visibility ?? 0)}
                  sunrise={format(fromUnixTime(data?.city.sunrise ?? 1702949452), "HH:mm a")}
                  sunset={format(fromUnixTime(data?.city.sunset ?? 1702517657), "HH:mm a")}
                />
              </Container>
            </div>

          </div>
        </section>

        {/*7-day weather forecast */}
        <section className="flex flex-col gap-4 w-full">
          <p className="text-2xl font-semibold">7-day weather forecast</p>

          {firstDataForEachDate.map((weather, index) => (
            <WeatherForecastDetail 
              key={index}
              weatherIcon={weather?.weather[0].icon ?? "01d"}
              feelsLike={weather?.main.feels_like ?? 0}
              temp={weather?.main.temp ?? 0}
              description={weather?.weather[0].description ?? ""}
              date={format(parseISO(weather?.dt_txt ?? ''), 'dd.MM')}
              day={format(parseISO(weather?.dt_txt ?? ''), 'EEEE')}
              temp_min={weather?.main.temp_min ?? 0}
              temp_max={weather?.main.temp_max ?? 0}
              airPressure={`${weather?.main.pressure} hPa `}
              humidity={`${weather?.main.humidity}% `}
              sunrise={format(
                fromUnixTime(data?.city.sunrise ?? 1702517657),
                "H:mm"
              )}
              sunset={format(
                fromUnixTime(data?.city.sunset ?? 1702517657),
                "H:mm"
              )}
              visibility={`${metersToKilometers(weather?.visibility ?? 10000)} `}
              windSpeed={`${convertSpeed(weather?.wind.speed ?? 1.64)} `}
            />
          ))}
        </section>
      </main>
    </div>
  );
}