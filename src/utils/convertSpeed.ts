// Usage: <ConvertSpeed />
// Description: Convert speed from m/s to km/h and vice versa
export default function convertSpeed(speedInMetersPerSecond: number): string {
    const speedInKilometersPerHour = speedInMetersPerSecond * 3.6;
    return `${speedInKilometersPerHour.toFixed(0)} km/h`;
}