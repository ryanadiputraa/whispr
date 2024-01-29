import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MeetSentimentService {
  private readonly logger = new Logger(MeetSentimentService.name);

  async getSentimentsByMeetId() {}
}
