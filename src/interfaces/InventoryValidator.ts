import {
  CreateInventoryInput,
  DeleteInventoryInput,
  GetInventoryInput,
  ListInventoryInput,
  RestoreInventoryInput,
  UpdateInventoryInput
} from './InventoryInputs'

export enum ValidationError {
  INT = 'Must be an integer',
  STRING = 'Must be a string',
  BOOLEAN = 'Must be a boolean',
  NON_NEGATIVE = 'Must be positive',
  NON_EMPTY = 'Must not be empty',
  REQUIRED = 'Field is required',
  CITY_UNAVAILABLE = 'Specified city is unavailable'
}

export type ValidationErrors<T> = {
  [Field in keyof T]?: ValidationError
}

// Interface that validates different types of inputs.
export interface InventoryValidator {
  validateCreate(
    input: any
  ): Promise<ValidationErrors<CreateInventoryInput> | null>
  validateGet(input: any): Promise<ValidationErrors<GetInventoryInput> | null>
  validateList(input: any): Promise<ValidationErrors<ListInventoryInput> | null>
  validateUpdate(
    input: any
  ): Promise<ValidationErrors<UpdateInventoryInput> | null>
  validateDelete(
    input: any
  ): Promise<ValidationErrors<DeleteInventoryInput> | null>
  validateRestore(
    input: any
  ): Promise<ValidationErrors<RestoreInventoryInput> | null>
}
