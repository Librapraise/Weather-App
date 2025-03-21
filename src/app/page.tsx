import Navbar from "@/components/Navbar";


// `https://api.openweathermap.org/data/2.5/forecast?q=lagos&appid=b860c559872450f714aa00e2ea86e7f2&cnt=56`

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
  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
    </div>
  );
}
