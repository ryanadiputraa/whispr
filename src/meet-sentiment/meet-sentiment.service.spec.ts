import { Test, TestingModule } from '@nestjs/testing';

import { MeetSentimentService } from './meet-sentiment.service';

describe('MeetSentimentService', () => {
  let service: MeetSentimentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeetSentimentService],
    }).compile();

    service = module.get<MeetSentimentService>(MeetSentimentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
