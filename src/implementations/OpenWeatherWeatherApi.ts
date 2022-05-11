import { Coordinate } from '../entities/Coordinate'
import { WeatherApi } from '../interfaces/WeatherApi'

export class OpenWeatherWeatherApi implements WeatherApi {
  getCurrentWeather(coordinate: Coordinate): Promise<[string, boolean]> {
    throw new Error('Method not implemented.')
  }
}
