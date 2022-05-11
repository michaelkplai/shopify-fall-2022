import { City } from '../entities/City'

export interface CreateInventoryInput {
  name: string
  stock: number
  city: City
}

export interface UpdateInventoryInput {
  id: string
  name?: string
  stock?: string
  city?: City
}

export interface GetInventoryInput {
  id: string
}

export interface ListInventoryInput {
  includeDeleted?: boolean
}

export interface DeleteInventoryInput {
  id: string
  deletionMessage: string
}

export interface UndeleteInventoryInput {
  id: string
}
