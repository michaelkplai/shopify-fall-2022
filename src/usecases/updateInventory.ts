import { Inventory } from '../entities/Inventory'
import { UpdateInventoryInput } from '../interfaces/InventoryInputs'
import { InventoryRepository } from '../interfaces/InventoryRepository'
import {
  InventoryValidator,
  ValidationErrors
} from '../interfaces/InventoryValidator'

export async function updateInventory(
  invRepo: InventoryRepository,
  invValidator: InventoryValidator,
  input: any
): Promise<
  [Inventory | null, ValidationErrors<UpdateInventoryInput> | null, boolean]
> {
  const validationError = await invValidator.validateUpdate(input)
  if (validationError) {
    return [null, validationError, false]
  }

  const validatedInput = <UpdateInventoryInput>input

  const [inventory, serverError] = await invRepo.update(validatedInput)

  if (serverError) {
    return [null, null, true]
  }

  return [inventory, null, false]
}
