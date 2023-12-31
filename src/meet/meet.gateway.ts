import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

import { Answer, AnswerDTO, MeetSession, Question, QuestionDTO } from './dto/ws-event.dto';
import { MeetService } from './meet.service';

@WebSocketGateway(Number(process.env.WS_PORT) || 8081, { cors: '*' })
export class MeetGateway {
  @WebSocketServer()
  server: Server;

  constructor(private meetService: MeetService) {}

  @SubscribeMessage('join')
  handleJoinMeeting(@MessageBody() { roomId, userId }: MeetSession, @ConnectedSocket() socket: Socket) {
    try {
      if (!roomId || !userId) return;
      const isModerator = this.meetService.addClient(roomId, userId);
      socket.join(roomId);
      socket.emit('joined', { isModerator });
    } catch (error) {
      socket.emit('error', { message: error.message ?? 'unkown error occured' });
    }
  }

  @SubscribeMessage('leave')
  async handleLeaveMeeting(@MessageBody() { roomId, userId }: MeetSession, @ConnectedSocket() socket: Socket) {
    if (!roomId || !userId) return;
    try {
      await this.meetService.deleteClient(roomId, userId);
      socket.leave(roomId);
    } catch (error) {
      socket.emit('error', { message: error.message ?? 'unkown error occured' });
    }
  }

  @SubscribeMessage('question')
  handleQuestion(@MessageBody() { meetId, question }: QuestionDTO, @ConnectedSocket() socket: Socket) {
    try {
      const resp: Question = {
        id: uuidv4(),
        question: question,
        created_at: new Date().toISOString(),
      };
      this.server.to(meetId).emit('question', { question: resp });
    } catch (error) {
      socket.emit('error', { message: error.message ?? 'unkown error occured' });
    }
  }

  @SubscribeMessage('answer')
  handleAnswer(@MessageBody() { meetId, questionId, username, answer }: AnswerDTO, @ConnectedSocket() socket: Socket) {
    try {
      const resp: Answer = {
        id: uuidv4(),
        questionId: questionId,
        answer: answer,
        username: username,
        created_at: new Date().toISOString(),
      };
      this.server.to(meetId).emit('answer', { answer: resp });
    } catch (error) {
      socket.emit('error', { message: error.message ?? 'unkown error occured' });
    }
  }
}
