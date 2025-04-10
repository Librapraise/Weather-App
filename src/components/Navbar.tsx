"use client";

import React, { useState } from 'react'
import { MdSunny } from 'react-icons/md'
import { MdMyLocation } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import SearchBox from './SearchBox';
import axios from 'axios';
import { useAtom } from 'jotai';
import { loadingCityAtom, placeAtom } from '@/app/Atom';



// Suggestion Box
function SuggesstionBox ({
    showSuggest,
    suggestions,
    handleSuggestionClick,
    error,
    } : {
        showSuggest: boolean, 
        suggestions: string[], 
        handleSuggestionClick: (item: string) => void,
        error: string
    }
    ) {

    return (
        <>
        {((showSuggest && suggestions.length > 1) || error) && (
          <ul className="mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md 
          min-w-[230px] flex flex-col gap-1 p-2"
           >
            {error && suggestions.length < 1 && (
              <li className="text-red-500 p-1 "> {error}</li>
            )}
            {suggestions.map((item, i) => (
              <li
                key={i}
                onClick={() => handleSuggestionClick(item)}
                className="cursor-pointer p-1 rounded hover:bg-gray-200"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </>
  
    )
}



// API Endpoint
const API_URL = process.env.NEXT_PUBLIC_WEATHER_KEY;


type Props = {
    className?: string;
    // onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
    // onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
    // value: string;
    // error: string;
    // suggestions: string[];
    // showSuggest: boolean;
    // handleSuggestionClick: (item: string) => void;
}

function Navbar({}: Props) {

    //handle value of search input
    const [city, setCity] = useState('');
    const [error, setError] = useState('');

    //jotai atom
    const [place, setPlace] = useAtom(placeAtom);
    const [loadingCity, setLoadingCity] = useAtom(loadingCityAtom);

    //handle suggestion
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggest, setShowSuggestions] = useState(false);
    
    //handle onchange       
    async function handleInputChange(value: string) {
        setCity(value);
        if(value.length >= 3){
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${API_URL}`
                );
                const suggestions = response.data.list.map((item: { name: string }) => item.name);
                if (suggestions.length < 1) {   
                    setError('City not found');
                }
                setSuggestions(suggestions);   
                setError('');
                setShowSuggestions(true); 
            } catch (error) {
                setError('City not found');
                setSuggestions([]);
                setShowSuggestions(false);
            }
        }   else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }
    
    //handle onsubmit
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        setLoadingCity(true);
        e.preventDefault();
        if (suggestions.length == 0) {
            setError('City not found');
            setShowSuggestions(false);
            setLoadingCity(false);
        }  else {
            setError('');
            setTimeout(() => {  
                setPlace(city);
                setCity('');
                setShowSuggestions(false);
                setLoadingCity(false);
            }, 1000);
        }
    };

    //handle suggestion click
    function handleSuggestionClick(value: string) {
        setCity(value);
        setShowSuggestions(false);
    }


    //handle current location
    //get current location
    function handleCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async(position) => {
                const { latitude, longitude } = position.coords;
                try {
                    // Fetch weather data using latitude and longitude
                    setLoadingCity(true);
                    const response = await axios.get(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_URL}`
                    );
                    setTimeout(() => {
                        setPlace(response.data.name);
                        setCity('');
                        setLoadingCity(false);
                    }
                    , 1000);
                } catch (error) {
                    setLoadingCity(false);
                    setError('Unable to retrieve weather data');
                }
            }, (error) => {
                console.error('Error getting location:', error);
                setError('Unable to retrieve location');
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    }

  return (
    <>
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
        <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
            <p className='flex items-center justify-center gap-2'>
                <span className='text-3xl text-gray-500'>Weather </span>
                <MdSunny className='text-3xl text-yellow-300'/>
            </p>

            <section className='flex gap-2 items-center'>
                <MdMyLocation 
                    title='current location'
                    onClick={handleCurrentLocation}
                    className='text-2xl text-gray-400 hover:opacity cursor-pointer'
                />
                <MdOutlineLocationOn className='text-2xl cursor-pointer'/>
                <p className='text-slate-900/80 text-sm capitalize'> 
                    {place}
                    {loadingCity && <span className='text-gray-400'>...loading</span>}
                </p>

                {/*search bar */}
                <div className="relative hidden md:flex ">
                    {/*search bar */}
                    <SearchBox 
                        value={city}
                        onChange={(e) => handleInputChange(e.target.value)}
                        onSubmit={handleSubmit}
                    />
                    <SuggesstionBox 
                        {...{
                            showSuggest,
                            suggestions,
                            handleSuggestionClick,
                            error
                        }}
                    />
                </div>
            </section>
        </div>

    </nav>

    <section className='flex max-w-7xl px-3 md:hidden '>
        {/*search bar */}
        <div className="relative">
            {/*search bar */}
            <SearchBox 
                value={city}
                onChange={(e) => handleInputChange(e.target.value)}
                onSubmit={handleSubmit}
            />
            <SuggesstionBox 
                {...{
                    showSuggest,
                    suggestions,
                    handleSuggestionClick,
                    error
                }}
            />
        </div>
    </section>
    </>
  )
}

export default Navbar;


