import { isValidCity } from '../entities/City'
import {
  CreateInventoryInput,
  UpdateInventoryInput,
  GetInventoryInput,
  ListInventoryInput,
  DeleteInventoryInput,
  UndeleteInventoryInput
} from '../interfaces/InventoryInputs'
import {
  InventoryValidator,
  ValidationError,
  ValidationErrors
} from '../interfaces/InventoryValidator'

export class SimpleInventoryValidator implements InventoryValidator {
  async validateCreate(
    input: any
  ): Promise<ValidationErrors<CreateInventoryInput> | null> {
    const errors: ValidationErrors<CreateInventoryInput> = {}

    if (input.name === undefined) {
      errors.name = ValidationError.REQUIRED
    } else if (typeof input.name !== 'string') {
      errors.name = ValidationError.STRING
    } else if (input.name === '') {
      errors.name = ValidationError.REQUIRED
    }

    if (input.stock === undefined) {
      errors.stock = ValidationError.REQUIRED
    } else if (
      typeof input.stock !== 'number' ||
      !Number.isInteger(input.stock)
    ) {
      errors.stock = ValidationError.INT
    } else if (input.stock < 0) {
      errors.stock = ValidationError.NON_NEGATIVE
    }

    if (input.city === undefined) {
      errors.city = ValidationError.REQUIRED
    } else if (typeof input.city !== 'string') {
      errors.city = ValidationError.STRING
    } else if (input.city === '') {
      errors.city = ValidationError.REQUIRED
    } else if (!isValidCity(input.city)) {
      errors.city = ValidationError.CITY_UNAVAILABLE
    }

    return Object.keys(errors).length ? errors : null
  }

  validateUpdate(
    input: UpdateInventoryInput
  ): Promise<ValidationErrors<UpdateInventoryInput> | null> {
    throw new Error('Method not implemented.')
  }
  validateGet(input: any): Promise<ValidationErrors<GetInventoryInput> | null> {
    throw new Error('Method not implemented.')
  }
  validateList(
    input: ListInventoryInput
  ): Promise<ValidationErrors<ListInventoryInput> | null> {
    throw new Error('Method not implemented.')
  }
  validateDelete(
    input: DeleteInventoryInput
  ): Promise<ValidationErrors<DeleteInventoryInput> | null> {
    throw new Error('Method not implemented.')
  }
  validateUndelete(
    input: UndeleteInventoryInput
  ): Promise<ValidationErrors<UndeleteInventoryInput> | null> {
    throw new Error('Method not implemented.')
  }
}
