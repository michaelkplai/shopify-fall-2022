import { Coordinate } from '../entities/Coordinate'

type ServerError = boolean

export interface WeatherApi {
  getCurrentWeather(coordinate: Coordinate): Promise<[string, ServerError]>
}
