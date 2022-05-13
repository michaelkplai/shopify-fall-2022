import { Inventory } from '../entities/Inventory'
import { CreateInventoryInput } from '../interfaces/InventoryInputs'
import { InventoryRepository } from '../interfaces/InventoryRepository'
import {
  InventoryValidator,
  ValidationErrors
} from '../interfaces/InventoryValidator'

type ServerError = boolean

export async function createInventory(
  invRepo: InventoryRepository,
  invValidator: InventoryValidator,
  input: any
): Promise<
  [Inventory | null, ValidationErrors<CreateInventoryInput | null>, ServerError]
> {
  const validationError = await invValidator.validateCreate(input)
  if (validationError) {
    return [null, validationError, false]
  }

  const validatedInput = <CreateInventoryInput>input

  const [inventory, serverError] = await invRepo.create(validatedInput)
  if (serverError || !inventory) {
    return [null, null, true]
  }

  return [inventory, null, false]
}
