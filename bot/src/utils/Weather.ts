import axios from 'axios';
import * as moment from 'moment';

const { DARKSKY_API } = process.env;

enum WeatherCodes {
    CLOUD = '☁️',
    SNOW_CLOUD = '🌨️',
    THUNDERSTORM = '🌩️',
    RAIN_WITH_LIGHTNING = '⛈️',
    SUN_WITH_CLOUDS = '🌤️',
    RAIN_WITH_SUN = '🌦️',
    TORNADO = '🌪️',
    HURRICANE = '🌀',
    FOG = '🌫️'
}

/**
 * @todo actually finish {DashClient|Weather} utility
 */
export class Weather {
    private apiKey: string = DARKSKY_API;
}
