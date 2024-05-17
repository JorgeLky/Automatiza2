export interface BadRequestErrorModel {
  code: string;
  message: string;
}

export class BadRequestError {
  error: BadRequestErrorModel;

  constructor(error: BadRequestErrorModel) {
    this.error = error;
  }
}
