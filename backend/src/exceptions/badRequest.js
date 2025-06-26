import { HttpException } from "./root";

export class BadRequestException extends HttpException {
  constructor(message, errorCode) {
    super(message, null, errorCode, 400);
  }
}
