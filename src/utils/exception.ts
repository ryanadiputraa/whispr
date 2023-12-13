import { BadRequestException, InternalServerErrorException, Logger } from '@nestjs/common';

export const handleServiceException = (error: any, controllerName: string) => {
  const logger = new Logger(controllerName);

  if (error instanceof BadRequestException) {
    throw new BadRequestException(error.message);
  }

  logger.error(error);
  throw new InternalServerErrorException();
};
