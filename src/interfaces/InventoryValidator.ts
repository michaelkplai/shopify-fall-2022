import {
  CreateInventoryInput,
  DeleteInventoryInput,
  GetInventoryInput,
  ListInventoryInput,
  UndeleteInventoryInput,
  UpdateInventoryInput
} from './InventoryInputs'

export enum ValidationError {
  REQUIRED = 'Field is required',
  NON_NEGATIVE = 'Must be positive',
  INT = 'Must be an integer',
  STRING = 'Must be a string',
  BOOLEAN = 'Must be a boolean',
  CITY_UNAVAILABLE = 'Specified city is unavailable'
}

export type ValidationErrors<T> = {
  [Field in keyof T]?: ValidationError
}

export interface InventoryValidator {
  validateCreate(
    input: any
  ): Promise<ValidationErrors<CreateInventoryInput> | null>
  validateUpdate(
    input: any
  ): Promise<ValidationErrors<UpdateInventoryInput> | null>
  validateGet(input: any): Promise<ValidationErrors<GetInventoryInput> | null>
  validateList(input: any): Promise<ValidationErrors<ListInventoryInput> | null>
  validateDelete(
    input: any
  ): Promise<ValidationErrors<DeleteInventoryInput> | null>
  validateUndelete(
    input: any
  ): Promise<ValidationErrors<UndeleteInventoryInput> | null>
}
