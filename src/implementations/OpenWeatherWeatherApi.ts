import fetch from 'node-fetch'

import { Coordinate } from '../entities/Coordinate'
import { WeatherApi } from '../interfaces/WeatherApi'

export class OpenWeatherWeatherApi implements WeatherApi {
  async getCurrentWeather(coordinate: Coordinate): Promise<[string, boolean]> {
    const apiKey = process.env.OPEN_WEATHER_API_KEY
    if (!apiKey) return ['', true]

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coordinate.lat}&lon=${coordinate.lon}&appid=${apiKey}`
      )

      const json = await response.json()

      if (!json || !json.main || typeof json.main.temp !== 'number') {
        return ['', true]
      }

      const kelvinToCelciusOffset = -273.15
      const currentTemp = (json.main.temp + kelvinToCelciusOffset).toFixed(0)

      return [`Currently ${currentTemp} degrees Celcius with `, false]
    } catch (e) {
      console.error('Something went wrong fetching the weather', e)
      return ['', true]
    }
  }
}
