import React from 'react'

// Function to convert temperature from Kelvin to Celsius
// Kelvin is the default temperature unit in the OpenWeather API
// This function converts the temperature from Kelvin to Celsius
// and returns the temperature in Celsius
// The temperature is rounded down to the nearest whole number
// The formula to convert from Kelvin to Celsius is:
// tempInCelsius = tempInKelvin - 273.15    
// The function takes in a number as an argument
// The number is the temperature in Kelvin
// The function returns a number
// The number is the temperature in Celsius
// The function is exported so it can be used in other files



export default function convertKelvinTOCelsius(tempInKelvin: number): number {
    const tempInCelsius = tempInKelvin - 273.15
    return Math.floor(tempInCelsius);
}