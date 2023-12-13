import { BadRequestException, ValidationError } from '@nestjs/common';

export const validatorException = (error: ValidationError[]) => {
  const errors = {};
  error.forEach((error) => {
    errors[error.property] = error.constraints[Object.keys(error.constraints)[0]];
  });

  return new BadRequestException({
    message: 'Invalid params',
    errors,
  });
};
