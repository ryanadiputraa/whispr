export interface MeetSession {
  roomId: string;
  userId: string;
}

export class WsErrorResponse extends Error {
  message: string;
}
