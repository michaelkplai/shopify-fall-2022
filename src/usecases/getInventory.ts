import { Inventory } from '../entities/Inventory'
import { GetInventoryInput } from '../interfaces/InventoryInputs'
import { InventoryRepository } from '../interfaces/InventoryRepository'
import {
  InventoryValidator,
  ValidationErrors
} from '../interfaces/InventoryValidator'

type ServerError = boolean

export async function getInventory(
  invRepo: InventoryRepository,
  invValidator: InventoryValidator,
  input: any
): Promise<
  [Inventory | null, ValidationErrors<GetInventoryInput> | null, ServerError]
> {
  const validationError = await invValidator.validateGet(input)
  if (validationError) {
    return [null, validationError, false]
  }

  const validatedInput = <GetInventoryInput>input

  const [inventory, serverError] = await invRepo.get(validatedInput)
  if (serverError) {
    return [null, null, true]
  }

  return [inventory, null, false]
}
