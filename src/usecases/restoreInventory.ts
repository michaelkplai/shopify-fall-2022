import { Inventory } from '../entities/Inventory'
import { RestoreInventoryInput } from '../interfaces/InventoryInputs'
import { InventoryRepository } from '../interfaces/InventoryRepository'
import {
  InventoryValidator,
  ValidationErrors
} from '../interfaces/InventoryValidator'

type ServerError = boolean

export async function restoreInventory(
  invRepo: InventoryRepository,
  invValidator: InventoryValidator,
  input: any
): Promise<
  [
    Inventory | null,
    ValidationErrors<RestoreInventoryInput> | null,
    ServerError
  ]
> {
  const validationError = await invValidator.validateRestore(input)
  if (validationError) {
    return [null, validationError, false]
  }

  const validatedInput = <RestoreInventoryInput>input

  const [inventory, serverError] = await invRepo.restore(validatedInput)
  if (serverError) {
    return [null, null, true]
  }

  return [inventory, null, false]
}
