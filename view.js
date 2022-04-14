import {favoriteCities, deleteFavoriteCity, requestServerWeather, requestServerWeatherForecast} from './main.js';
import {addSelectedCity} from './storage.js';
export const HTML_CODE = {
    LIST_FAVORITE_CITIES: {
        part1: '<li class="weather__locations-list-item flex"><button class="weather__locations-favorite-btn">',
        part2: '</button><button class="weather__location-del"></button></li>',
    },
    FORECAST_CITIES: {
        part1: '<li class="tab-forecast__list-item flex">\n' +
            '                                <div class="tab-forecast__item-top flex">\n' +
            '                                    <span class="tab-forecast__date">',
        part2: '</span>\n' +
            '                                    <span class="tab-forecast__time1">',
        part3: '</span>\n' +
            '                                </div>\n' +
            '                                <div class="tab-forecast__item-bottom flex">\n' +
            '                                    <div class="tab-forecast__briefly-condition">\n' +
            '                                        <p class="tab-forecast__temp">\n' +
            '                                            Temperature: <span>',
        part4: '</span>\n' +
            '                                        </p>\n' +
            '                                        <p class="tab-forecast__feels">\n' +
            '                                            Feels like: <span>',
        part5: '</span>\n' +
            '                                        </p>\n' +
            '                                    </div>\n' +
            '                                    <div class="tab-forecast__weather">',
        part6: '</div>\n' +
            '                                </div>\n' +
            '                            </li>',
    },
};

export const UI_ELEMENTS = {
    MAIN: {
        INPUT_FIELD: document.querySelector('.form__input'),
        ENTER_CITY: document.querySelector('.form'),
    },
    NOW: {
        CITY: document.querySelector('.tab-now__city'),
        TEMPERATURE: document.querySelector('.header.header_now'),
        SKY: document.querySelector('.weather__tab-container_now'),
        HEART_BUTTON: document.querySelector('.tab-now__add-to-fav'),
        LIST_FAVORITE_CITIES: document.querySelector('.weather__locations-list'),
    },
    DETAILS: {
        CITY: document.querySelector('.header.header_details'),
        TEMPERATURE: document.querySelector('.details__temp'),
        FEELS_LIKE: document.querySelector('.details__feels'),
        WEATHER: document.querySelector('.details__weather'),
        SUNRISE: document.querySelector('.details__sunrise'),
        SUNSET: document.querySelector('.details__sunset'),
    },
    FORECAST: {
        CITY: document.querySelector('.header.header_forecast'),
        LIST: document.querySelector('.tab-forecast__list'),
    }
};
function setTimeHoursMinutes(milliseconds) {
    const obj = new Date(milliseconds);
    const hours = obj.getHours();
    const minutes = obj.getMinutes();
    if (minutes === 0) {
        return ( `${hours}:${minutes}` + '0' );
    } else {
        return ( `${hours}:${minutes}` );
    };
}
export function addUiFavoriteCities(icon, temp, name, feels_like, main, sunset, sunrise) {
    const iconUrl = `url("https://openweathermap.org/img/wn/${icon}@4x.png")`;
    UI_ELEMENTS.NOW.CITY.textContent = name;
    UI_ELEMENTS.NOW.TEMPERATURE.textContent = temp + '°';
    UI_ELEMENTS.NOW.SKY.style.backgroundImage = iconUrl;

    UI_ELEMENTS.DETAILS.CITY.textContent = name;
    UI_ELEMENTS.DETAILS.TEMPERATURE.textContent = temp + '°';
    UI_ELEMENTS.DETAILS.FEELS_LIKE.textContent = feels_like + '°';
    UI_ELEMENTS.DETAILS.WEATHER.textContent = main;
    UI_ELEMENTS.DETAILS.SUNRISE.textContent = setTimeHoursMinutes(sunrise * 1000);;
    UI_ELEMENTS.DETAILS.SUNSET.textContent = setTimeHoursMinutes(sunset * 1000);

    UI_ELEMENTS.FORECAST.CITY.textContent = name;

    addSelectedCity(name);
};

const MONTH = {
    '0': 'January',
    '1': 'February',
    '2': 'March',
    '3': 'April',
    '4': 'May',
    '5': 'June',
    '6': 'July',
    '7': 'August',
    '8': 'September',
    '9': 'October',
    '10': 'November',
    '11': 'December',
}
function getDate(milliseconds) {
    const obj = new Date(milliseconds);
    const day = obj.getDate();
    const month = obj.getMonth();
    return day + ' ' + MONTH[month];
}

export function addUiForecast(icon, temp, feels_like, dt, main, i) {
    const iconUrl = `url("https://openweathermap.org/img/wn/${icon}.png")`;
    const forecastTemperature  = temp + '°';
    const forecastFeelsLike = feels_like + '°';
    const forecastDate = getDate(dt * 1000);
    const forecastWeather = main;
    const forecastTime = setTimeHoursMinutes(dt * 1000);

    UI_ELEMENTS.FORECAST.LIST.innerHTML +=
        HTML_CODE.FORECAST_CITIES.part1 + forecastDate +
        HTML_CODE.FORECAST_CITIES.part2 + forecastTime +
        HTML_CODE.FORECAST_CITIES.part3 + forecastTemperature +
        HTML_CODE.FORECAST_CITIES.part4 + forecastFeelsLike +
        HTML_CODE.FORECAST_CITIES.part5 + forecastWeather +
        HTML_CODE.FORECAST_CITIES.part6;

    document.querySelectorAll('.tab-forecast__weather')[i].style.backgroundImage = iconUrl;
};

export function outputFavoriteCity() {
    UI_ELEMENTS.NOW.LIST_FAVORITE_CITIES.innerHTML = '';
    favoriteCities.forEach((favoriteCity) =>
        UI_ELEMENTS.NOW.LIST_FAVORITE_CITIES.innerHTML +=
        HTML_CODE.LIST_FAVORITE_CITIES.part1 +
        favoriteCity +
        HTML_CODE.LIST_FAVORITE_CITIES.part2);
    setButtonDelete();
    setButtonOutputFavoriteCity();
};


export function setButtonDelete() {
    const buttonDelete = document.querySelectorAll('.weather__location-del');
    for (let elem of buttonDelete) {
        elem.addEventListener("click", function () {
            deleteFavoriteCity(elem.parentNode.textContent);
        });
    };
}

export function setButtonOutputFavoriteCity() {
    const buttonOutputFavoriteCity = document.querySelectorAll('.weather__locations-favorite-btn');
    for (let elem of buttonOutputFavoriteCity) {
        elem.addEventListener("click", () => requestServerWeather(elem.textContent));
        elem.addEventListener("click", () => requestServerWeatherForecast(elem.textContent));
    };
};