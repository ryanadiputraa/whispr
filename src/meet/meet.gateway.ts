import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

const ROOMS = {};

@WebSocketGateway(Number(process.env.WS_PORT) || 8081, { cors: '*' })
export class MeetGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('connection')
  handleConnection() {
    console.log('connected');
  }
}
