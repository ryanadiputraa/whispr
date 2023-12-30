import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

import { WsErrorResponse } from './dto/ws-event.dto';
import { Meet, MeetSessions } from './entities/meet';

@Injectable()
export class MeetService {
  private readonly logger = new Logger(MeetService.name);
  private sessionIdCharacters = 'abcdefghijklmnopqrstuvwxyz';
  private sessionIdLength = 4;
  private sessionIdSequence = 3;
  private meetSessions: MeetSessions = {};

  constructor(@Inject('MEET_REPOSITORY') private meetRepository: typeof Meet) {}

  generateMeetId(): string {
    const idSets: string[] = [];

    for (let i = 0; i < this.sessionIdSequence; i++) {
      let chars = '';
      for (let j = 0; j < this.sessionIdLength; j++) {
        const randomIndex = Math.floor(Math.random() * this.sessionIdCharacters.length);
        chars += this.sessionIdCharacters.charAt(randomIndex);
      }
      idSets.push(chars);
    }

    return idSets.join('-');
  }

  async createNewMeet(clientId: string): Promise<string> {
    try {
      const sessionId = this.generateMeetId();
      this.logger.log(`new meeting session: ${sessionId}`);
      this.meetSessions[sessionId] = {
        [clientId]: true,
      };

      await this.meetRepository.create({
        id: sessionId,
        userId: clientId,
        name: 'Silent Meet', // TODO: get user input
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return sessionId;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  async endMeet(sessionId: string) {
    try {
      this.logger.log(`meet session "${sessionId}" has ended`);
      await this.meetRepository.update({ endedAt: new Date() }, { where: { id: sessionId } });
      delete this.meetSessions[sessionId];
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  addClient(sessionId: string, clientId: string): boolean {
    try {
      if (!this.meetSessions[sessionId]) throw new WsErrorResponse(`meeting ${sessionId} session didn' exists`);
      const isModerator = this.meetSessions[sessionId]?.[clientId] ?? false;

      this.meetSessions[sessionId] = {
        ...this.meetSessions[sessionId],
        [clientId]: isModerator,
      };

      this.logger.log(`user "${clientId}" join meet session "${sessionId}"`);
      return isModerator;
    } catch (error) {
      if (error instanceof WsErrorResponse) {
        this.logger.warn(error);
        throw new WsErrorResponse(error.message);
      }
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  async deleteClient(sessionId: string, clientId: string) {
    try {
      const isModerator = this.meetSessions[sessionId]?.[clientId];

      if (isModerator) {
        if (Object.keys(this.meetSessions[sessionId]).length <= 1) await this.endMeet(sessionId);
      } else {
        this.logger.log(`user "${clientId}" leave meet session "${sessionId}"`);
        delete this.meetSessions[sessionId]?.[clientId];
      }
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }
}
