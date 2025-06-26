import { ZodError } from "zod";
import { UnprocessableEntity } from "./exceptions/unprocessableEntity.js";
import { Errorcodes, HttpException } from "./exceptions/root.js";
import { InternalException } from "./exceptions/internalException.js";
export const errorHandler = (method) => {
  return async (req, res, next) => {
    try {
      await method(req, res, next);
    } catch (error) {
      let exception;
      if (error instanceof ZodError) {
        exception = new UnprocessableEntity(
          "Validation Failed",
          error.errors,
          Errorcodes.UNPROSSABLE_ENTITY
        );
      } else if (error instanceof HttpException) {
        exception = error;
      } else {
        exception = new InternalException(error, Errorcodes.INTERNAL_EXEPTION);
      }
      next(exception);
    }
  };
};
