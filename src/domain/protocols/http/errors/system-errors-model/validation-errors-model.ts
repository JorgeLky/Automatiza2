export interface ValidationErrorModel {
  errors: { rule: string; field: string; message: string }[];
}

export class ValidationError {
  errors: ValidationErrorModel

  constructor(errors: ValidationErrorModel) {
    this.errors = errors;
  }
}
