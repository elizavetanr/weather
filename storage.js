import {addFavoriteCity, requestServerWeatherForecast, requestServerWeather} from "./main.js";

export const citiesLocalStorage = new Set();

export function addFavoriteCitiesInLocalStorage() {

    localStorage.setItem('cities', JSON.stringify([...citiesLocalStorage]));
}

export function addFavoriteCitiesFromLocalStorageToJs() {
    const cities = JSON.parse(localStorage.getItem('cities'));
    cities.forEach((city) => addFavoriteCity(city));
}

export function addSelectedCity(nameSelectedCity) {
localStorage.setItem('selectedCity', nameSelectedCity);
}
//
export function outputSelectedCity() {
    const selectedCity = localStorage.getItem('selectedCity');
    requestServerWeather(selectedCity);
    requestServerWeatherForecast(selectedCity);
}