import { BadRequestException, ValidationError } from '@nestjs/common';

export const validatorException = (errors: ValidationError[]) => {
  const message = {};
  errors.forEach((error) => {
    message[error.property] = error.constraints[Object.keys(error.constraints)[0]];
  });

  return new BadRequestException({
    status_code: 400,
    error: 'Bad Request',
    message,
  });
};
