import { Coordinate } from './Coordinate'

export enum City {
  OTTAWA = 'OTTAWA',
  TORONTO = 'TORONTO',
  VANCOUVER = 'VANCOUVER',
  NEW_YORK = 'NEW_YORK',
  LONDON = 'LONDON'
}

export function isValidCity(city: string): city is City {
  return Object.values(City).includes(city as City)
}

export const cityMeta: {
  [key in City]: {
    coordinate: Coordinate
    prettyName: string
  }
} = {
  [City.OTTAWA]: {
    coordinate: { lat: 45.4214, lon: -75.6919 },
    prettyName: 'Ottawa'
  },
  [City.TORONTO]: {
    coordinate: { lat: 43.6532, lon: -79.3832 },
    prettyName: 'Toronto'
  },
  [City.VANCOUVER]: {
    coordinate: { lat: 49.2827, lon: -123.1207 },
    prettyName: 'Vancouver'
  },
  [City.NEW_YORK]: {
    coordinate: { lat: 40.7128, lon: -74.006 },
    prettyName: 'New York'
  },
  [City.LONDON]: {
    coordinate: { lat: 51.5074, lon: -0.1278 },
    prettyName: 'London'
  }
}
