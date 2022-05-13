import { City } from '../entities/City'

export interface CreateInventoryInput {
  name: string
  stock: number
  city: City
}

export interface GetInventoryInput {
  id: string
}

export interface ListInventoryInput {
  deleted?: boolean
}

export interface UpdateInventoryInput {
  id: string
  name?: string
  stock?: string
  city?: City
}

export interface DeleteInventoryInput {
  id: string
  deletionComment: string
}

export interface RestoreInventoryInput {
  id: string
}
