export class HttpException extends Error {
  constructor(message, errors, errorCode, statusCode) {
    super(message);
    this.errorCode = errorCode;
    this.errors = errors;
    this.statusCode = statusCode;
  }
}
export const Errorcodes = {
  USER_NOT_FOUND: 1001,
  USER_ALREADY_EXISTS: 1002,
  INCORRECT_PASSWORD: 1003,
  UNPROSSABLE_ENTITY: 2001,
  INTERNAL_EXEPTION: 3001,
  UNAUTHORIZED: 4001,
};
