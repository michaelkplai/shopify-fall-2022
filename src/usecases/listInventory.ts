import { Inventory } from '../entities/Inventory'
import { ListInventoryInput } from '../interfaces/InventoryInputs'
import { InventoryRepository } from '../interfaces/InventoryRepository'
import {
  InventoryValidator,
  ValidationErrors
} from '../interfaces/InventoryValidator'

type ServerError = boolean

export async function listInventory(
  invRepo: InventoryRepository,
  invValidator: InventoryValidator,
  input: any
): Promise<
  [Inventory[], ValidationErrors<ListInventoryInput> | null, ServerError]
> {
  const validationError = await invValidator.validateList(input)
  if (validationError) {
    return [[], validationError, false]
  }
  const validatedInput = <ListInventoryInput>input

  const [inventories, serverError] = await invRepo.list(validatedInput)
  if (serverError) {
    return [[], null, true]
  }

  return [inventories, null, false]
}
