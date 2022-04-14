
import {UI_ELEMENTS, addUiFavoriteCities, addUiForecast, outputFavoriteCity} from './view.js';
import {citiesLocalStorage, addFavoriteCitiesInLocalStorage, addFavoriteCitiesFromLocalStorageToJs, outputSelectedCity} from './storage.js';
export const favoriteCities = new Set();

const serverUrl1 = 'https://api.openweathermap.org/data/2.5/weather';
const serverUrl2 = 'https://api.openweathermap.org/data/2.5/forecast';
const apiKey = '53c980ad4433b54136e7be00d64a0f1d';

UI_ELEMENTS.MAIN.ENTER_CITY.addEventListener("submit", () => requestServerWeather(UI_ELEMENTS.MAIN.INPUT_FIELD.value));
UI_ELEMENTS.MAIN.ENTER_CITY.addEventListener("submit", () => requestServerWeatherForecast(UI_ELEMENTS.MAIN.INPUT_FIELD.value));
UI_ELEMENTS.NOW.HEART_BUTTON.addEventListener("click", () => addFavoriteCity(UI_ELEMENTS.NOW.CITY.textContent));

requestServerWeather('Moscow');
requestServerWeatherForecast('Moscow');
outputSelectedCity();
addFavoriteCitiesFromLocalStorageToJs();
outputFavoriteCity();

export async function requestServerWeather(cityName) {
    try {
        const url1 = `${serverUrl1}?q=${cityName}&appid=${apiKey}&units=metric`;
        let responseWeather = await fetch(url1);
        let json = await responseWeather.json();
        const {
            weather: [
                {
                    main,
                    icon
                }
            ],
            main: {
                temp,
                feels_like
            },
            sys: {
                sunrise,
                sunset
            },
            name
        } = json;
        addUiFavoriteCities(icon, temp, name, feels_like, main, sunset, sunrise);
    } catch (err) {
        if (cityName === 'Город в стиле диско' || 'город в стиле диско') {
            alert('вы дурной');
            requestServerWeather('Сан-франциско');
            requestServerWeatherForecast('Сан-франциско');
        };
    }
};

export async function requestServerWeatherForecast(cityName) {
    try {
        UI_ELEMENTS.FORECAST.LIST.innerHTML = '';
        const url2 = `${serverUrl2}?q=${cityName}&appid=${apiKey}&units=metric`;
        let responseWeather = await fetch(url2);
        let json = await responseWeather.json();
        for (let i = 0; i < 8; i++) {
            const oneStepForecastWeather = json.list[i];
            const {
                dt,
                main: {
                    temp,
                    feels_like
                },
                weather: [
                    {
                        main,
                        icon
                    }
                ],
            } = oneStepForecastWeather;
            addUiForecast(icon, temp, feels_like, dt, main, i);
        };
    } catch (err) {
        alert(err);
    }
}

export function addFavoriteCity(favoriteCityName) {
    favoriteCities.add(favoriteCityName);
    citiesLocalStorage.add(favoriteCityName);
    addFavoriteCitiesInLocalStorage()
    outputFavoriteCity();
}

export function deleteFavoriteCity(nameFavoriteCities) {
    favoriteCities.delete(nameFavoriteCities);
    citiesLocalStorage.delete(nameFavoriteCities);
    addFavoriteCitiesInLocalStorage();
    outputFavoriteCity();
};

