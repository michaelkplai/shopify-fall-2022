import { isValidCity } from '../entities/City'
import {
  CreateInventoryInput,
  UpdateInventoryInput,
  GetInventoryInput,
  ListInventoryInput,
  DeleteInventoryInput,
  RestoreInventoryInput
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
      errors.name = ValidationError.NON_EMPTY
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
      errors.city = ValidationError.NON_EMPTY
    } else if (!isValidCity(input.city)) {
      errors.city = ValidationError.CITY_UNAVAILABLE
    }

    return Object.keys(errors).length ? errors : null
  }

  async validateUpdate(
    input: any
  ): Promise<ValidationErrors<UpdateInventoryInput> | null> {
    const errors: ValidationErrors<UpdateInventoryInput> = {}

    if (input.id === undefined) {
      errors.id = ValidationError.REQUIRED
    } else if (typeof input.id !== 'string') {
      errors.id = ValidationError.STRING
    } else if (input.id === '') {
      errors.id = ValidationError.NON_EMPTY
    }

    if (input.name !== undefined) {
      if (typeof input.name !== 'string') {
        errors.name = ValidationError.STRING
      } else if (input.name === '') {
        errors.name = ValidationError.NON_EMPTY
      }
    }

    if (input.stock !== undefined) {
      if (typeof input.stock !== 'number' || !Number.isInteger(input.stock)) {
        errors.stock = ValidationError.INT
      } else if (input.stock < 0) {
        errors.stock = ValidationError.NON_NEGATIVE
      }
    }

    if (input.city !== undefined) {
      if (typeof input.city !== 'string') {
        errors.city = ValidationError.STRING
      } else if (input.city === '') {
        errors.city = ValidationError.NON_EMPTY
      } else if (!isValidCity(input.city)) {
        errors.city = ValidationError.CITY_UNAVAILABLE
      }
    }

    return Object.keys(errors).length ? errors : null
  }

  async validateGet(
    input: any
  ): Promise<ValidationErrors<GetInventoryInput> | null> {
    const errors: ValidationErrors<GetInventoryInput> = {}

    if (input.id === undefined) {
      errors.id = ValidationError.REQUIRED
    } else if (typeof input.id !== 'string') {
      errors.id = ValidationError.STRING
    } else if (input.id === '') {
      errors.id = ValidationError.REQUIRED
    }

    return Object.keys(errors).length ? errors : null
  }

  async validateList(
    input: any
  ): Promise<ValidationErrors<ListInventoryInput> | null> {
    const errors: ValidationErrors<ListInventoryInput> = {}

    if (input.deleted !== undefined) {
      if (typeof input.deleted !== 'boolean') {
        errors.deleted = ValidationError.BOOLEAN
      }
    }

    return Object.keys(errors).length ? errors : null
  }

  async validateDelete(
    input: any
  ): Promise<ValidationErrors<DeleteInventoryInput> | null> {
    const errors: ValidationErrors<DeleteInventoryInput> = {}

    if (input.id === undefined) {
      errors.id = ValidationError.REQUIRED
    } else if (typeof input.id !== 'string') {
      errors.id = ValidationError.STRING
    } else if (input.id === '') {
      errors.id = ValidationError.REQUIRED
    }

    if (input.deletionMessage === undefined) {
      errors.deletionMessage = ValidationError.REQUIRED
    } else if (typeof input.deletionMessage !== 'string') {
      errors.deletionMessage = ValidationError.STRING
    } else if (input.deletionMessage === '') {
      errors.deletionMessage = ValidationError.REQUIRED
    }

    return Object.keys(errors).length ? errors : null
  }

  async validateRestore(
    input: any
  ): Promise<ValidationErrors<RestoreInventoryInput> | null> {
    const errors: ValidationErrors<RestoreInventoryInput> = {}

    if (input.id === undefined) {
      errors.id = ValidationError.REQUIRED
    } else if (typeof input.id !== 'string') {
      errors.id = ValidationError.STRING
    } else if (input.id === '') {
      errors.id = ValidationError.NON_EMPTY
    }

    return Object.keys(errors).length ? errors : null
  }
}
