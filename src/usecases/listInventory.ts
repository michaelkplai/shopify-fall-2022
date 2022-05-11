import { Inventory } from '../entities/Inventory'
import { ListInventoryInput } from '../interfaces/InventoryInputs'
import { InventoryRepository } from '../interfaces/InventoryRepository'
import {
  InventoryValidator,
  ValidationErrors
} from '../interfaces/InventoryValidator'

export async function listInventory(
  invRepo: InventoryRepository,
  invValidator: InventoryValidator,
  input: any
): Promise<
  [Inventory[], ValidationErrors<ListInventoryInput> | null, boolean]
> {
  // const validationError = await invValidator.validateList(input)
  // if (validationError) {
  //   return [[], validationError, false]
  // }

  // const validatedInput = <ListInventoryInput>input

  const [inventories, serverError] = await invRepo.list({ deleted: false })

  if (serverError) {
    return [[], null, true]
  }

  // TODO get weather

  return [inventories, null, false]
}
