import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { MeetSession } from './dto/ws-event.dto';
import { MeetService } from './meet.service';

@WebSocketGateway(Number(process.env.WS_PORT) || 8081, { cors: '*' })
export class MeetGateway {
  @WebSocketServer()
  server: Server;

  constructor(private meetService: MeetService) {}

  @SubscribeMessage('join')
  handleJoinMeeting(@MessageBody() data: MeetSession, @ConnectedSocket() socket: Socket) {
    try {
      if (!data.roomId || !data.userId) return;
      this.meetService.addClient(data.roomId, data.userId);
      socket.emit('joined');
    } catch (error) {
      socket.emit('error', { message: error.message ?? 'unkown error occured' });
    }
  }

  @SubscribeMessage('leave')
  handleLeaveMeeting(@MessageBody() data: MeetSession, @ConnectedSocket() socket: Socket) {
    if (!data.roomId || !data.userId) return;
    try {
      this.meetService.deleteClient(data.roomId, data.userId);
    } catch (error) {
      socket.emit('error', { message: error.message ?? 'unkown error occured' });
    }
  }
}
