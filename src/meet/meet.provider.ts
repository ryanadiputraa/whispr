import { Meet, Question, Response } from './entities';

export const meetProviders = [
  {
    provide: 'MEET_REPOSITORY',
    useValue: Meet,
  },
  {
    provide: 'QUESTION_REPOSITORY',
    useValue: Question,
  },
  {
    provide: 'RESPONSE_REPOSITORY',
    useValue: Response,
  },
];
