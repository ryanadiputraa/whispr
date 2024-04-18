import { IsNotEmpty } from 'class-validator';
import { Response } from 'meet/entities';

export class CreateMeetDto {
  @IsNotEmpty()
  name: string;
}

export interface Topic {
  question: string;
  createdAt: string;
  updatedAt: string;
  response: Response[];
}
