import { HttpException, InternalServerErrorException, Logger } from '@nestjs/common';

export const handleServiceException = (error: any, controllerName: string) => {
  const logger = new Logger(controllerName);

  if (error instanceof HttpException) {
    throw error;
  }

  logger.error(error);
  throw new InternalServerErrorException({
    message: 'Internal Server Error',
  });
};
