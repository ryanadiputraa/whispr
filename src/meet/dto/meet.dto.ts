import { IsNotEmpty } from 'class-validator';
import { Response } from 'meet/entities';

export class CreateMeetDto {
  @IsNotEmpty()
  name: string;
}

export interface MeetDetails {
  [topicId: string]: {
    question: string;
    createdAt: string;
    updatedAt: string;
    response: Response[];
  };
}
