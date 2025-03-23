"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format, parseISO } from "date-fns";
import Container from "@/components/Container";
import convertKelvinTOCelsius from "@/utils/convertKelvinTOCelsius";

// API Endpoint
const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=lagos&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=6`;

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


  if (isPending) return <div className="flex min-h-screen items-center justify-center animate-bounce ">Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 pb-10 pt-4 w-full">
        {/*today weather forecast */}
        <section className="flex flex-col gap-4 space-y-4">
          <div className="space-y-2">
            <h1 className="flex gap-1 text-2xl items-end">
              <p> {format(parseISO(todayWeather?.dt_txt ?? ''), 'EEEE')}</p>
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
              <div className="flex gap-10 sm:gap-16 justify-between overflow-x-auto scrollbar-hide w-full pr-3">
                {data?.list.map((weather, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <img
                      src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                      alt={weather.weather[0].description}
                      className="w-12 h-12"
                    />
                    <p className="text-xs text-center">{format(parseISO(weather.dt_txt), 'HH:mm')}</p>
                    <p className="text-xs text-center">{weather.weather[0].description}</p>
                  </div>
                ))}
              </div>
            </Container>
          </div>
        </section>

        {/*7-day weather forecast */}
        <section className="flex flex-col gap-4">
          <div>
              
          </div>
        </section>
      </main>
    </div>
  );
}