import { Inventory } from '../entities/Inventory'
import { DeleteInventoryInput } from '../interfaces/InventoryInputs'
import { InventoryRepository } from '../interfaces/InventoryRepository'
import {
  InventoryValidator,
  ValidationErrors
} from '../interfaces/InventoryValidator'

export async function deleteInventory(
  invRepo: InventoryRepository,
  invValidator: InventoryValidator,
  input: any
): Promise<
  [Inventory | null, ValidationErrors<DeleteInventoryInput> | null, boolean]
> {
  const validationError = await invValidator.validateDelete(input)
  if (validationError) {
    return [null, validationError, false]
  }

  const validatedInput = <DeleteInventoryInput>input

  const [inventory, serverError] = await invRepo.delete(validatedInput)

  if (serverError) {
    return [null, null, true]
  }

  return [inventory, null, false]
}
