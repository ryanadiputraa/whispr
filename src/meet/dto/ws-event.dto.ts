export interface MeetSession {
  roomId: string;
  userId: string;
}

export class WsErrorResponse extends Error {
  message: string;
}

export interface Question {
  id: string;
  question: string;
  createdAt: string;
}

export interface QuestionDTO {
  meetId: string;
  question: string;
}

export interface Answer {
  id: string;
  questionId: string;
  username: string;
  response: string;
  createdAt: string;
}

export interface AnswerDTO {
  meetId: string;
  username: string;
  questionId: string;
  answer: string;
}
