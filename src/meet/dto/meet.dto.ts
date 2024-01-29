import { IsNotEmpty } from 'class-validator';

export class CreateMeetDto {
  @IsNotEmpty()
  name: string;
}
