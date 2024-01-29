import { Module } from '@nestjs/common';

import { MeetSentimentService } from './meet-sentiment.service';

@Module({
  providers: [MeetSentimentService],
})
export class MeetSentimentModule {}
