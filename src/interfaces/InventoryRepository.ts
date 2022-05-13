import { Inventory } from '../entities/Inventory'
import {
  CreateInventoryInput,
  DeleteInventoryInput,
  GetInventoryInput,
  ListInventoryInput,
  RestoreInventoryInput,
  UpdateInventoryInput
} from './InventoryInputs'

type ServerError = boolean

export interface InventoryRepository {
  create(input: CreateInventoryInput): Promise<[Inventory | null, ServerError]>
  get(input: GetInventoryInput): Promise<[Inventory | null, ServerError]>
  list(input: ListInventoryInput): Promise<[Inventory[], ServerError]>
  update(input: UpdateInventoryInput): Promise<[Inventory | null, ServerError]>
  delete(input: DeleteInventoryInput): Promise<[Inventory | null, ServerError]>
  restore(
    input: RestoreInventoryInput
  ): Promise<[Inventory | null, ServerError]>
}
