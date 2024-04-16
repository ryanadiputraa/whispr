import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

import { Answer, AnswerDTO, MeetSession, Question, QuestionDTO } from './dto/ws-event.dto';
import { MeetService } from './meet.service';

@WebSocketGateway(0, { cors: '*' })
export class MeetGateway {
  @WebSocketServer()
  server: Server;

  constructor(private meetService: MeetService) {}

  @SubscribeMessage('join')
  async handleJoinMeeting(@MessageBody() { roomId, userId }: MeetSession, @ConnectedSocket() socket: Socket) {
    try {
      if (!roomId || !userId) return;
      const isModerator = this.meetService.addClient(roomId, userId);
      socket.join(roomId);
      const questions = await this.meetService.listQuestions(roomId);
      socket.emit('joined', { isModerator, questions: questions });
    } catch (error) {
      socket.emit('error', { message: error.message ?? 'unkown error occured' });
    }
  }

  @SubscribeMessage('end')
  async handleEndMeet(@MessageBody() { roomId, userId }: MeetSession, @ConnectedSocket() socket: Socket) {
    try {
      if (!roomId || !userId) return;
      this.server.to(roomId).emit('end');
      await this.meetService.endMeet(roomId);
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
  async handleQuestion(@MessageBody() { meetId, question }: QuestionDTO, @ConnectedSocket() socket: Socket) {
    try {
      const resp: Question = {
        id: uuidv4(),
        question: question,
        createdAt: new Date().toISOString(),
      };
      await this.meetService.saveQuestion(meetId, resp.id, question);
      this.server.to(meetId).emit('question', { question: resp });
    } catch (error) {
      socket.emit('error', { message: error.message ?? 'unkown error occured' });
    }
  }

  @SubscribeMessage('answer')
  async handleAnswer(
    @MessageBody() { meetId, questionId, username, answer }: AnswerDTO,
    @ConnectedSocket() socket: Socket,
  ) {
    try {
      const resp: Answer = {
        id: uuidv4(),
        questionId: questionId,
        response: answer,
        username: username,
        createdAt: new Date().toISOString(),
      };
      await this.meetService.saveResponse(questionId, resp.id, username, answer);
      this.server.to(meetId).emit('answer', { answer: resp });
    } catch (error) {
      socket.emit('error', { message: error.message ?? 'unkown error occured' });
    }
  }
}
