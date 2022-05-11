import { City } from './City'

export interface Inventory {
  id: string
  name: string
  stock: number
  city: City
  deleted: boolean
  deletionComment: string
  cityName?: string
  cityWeather?: string
}
