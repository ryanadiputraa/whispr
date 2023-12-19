import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

@Injectable()
export class MeetService {
  private readonly logger = new Logger(MeetService.name);
  private sessionIdCharacters = 'abcdefghijklmnopqrstuvwxyz';
  private sessionIdLength = 4;
  private sessionIdSequence = 3;

  generateMeetSessionId(): string {
    try {
      const idSets: string[] = [];

      for (let i = 0; i < this.sessionIdSequence; i++) {
        let chars = '';
        for (let j = 0; j < this.sessionIdLength; j++) {
          const randomIndex = Math.floor(Math.random() * this.sessionIdCharacters.length);
          chars += this.sessionIdCharacters.charAt(randomIndex);
        }
        idSets.push(chars);
      }

      const sessionId = idSets.join('-');
      this.logger.log(`new meeting session: ${sessionId}`);
      return sessionId;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
