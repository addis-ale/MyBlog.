import { HttpException } from "./root.js";

export class InternalException extends HttpException {
  constructor(error, errorCode) {
    super("Internal Server Error".error.errorCode, 500);
  }
}
