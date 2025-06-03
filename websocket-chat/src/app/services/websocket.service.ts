import { Injectable, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnDestroy {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000', {
      transports: ['websocket'],
    });
  
    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });
  
    this.socket.on('connect_error', (err) => {
      console.error('WebSocket connection error:', err);
    });
  
    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });
  }
  

  sendMessage(msg: string): void {
    this.socket.emit('message', msg);
  }

  onMessage(): Observable<string> {
    return new Observable<string>((observer) => {
      const messageHandler = (msg: string) => observer.next(msg);

      this.socket.on('message', messageHandler);

      // Cleanup on unsubscribe to avoid memory leaks
      return () => {
        this.socket.off('message', messageHandler);
      };
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  ngOnDestroy(): void {
    this.disconnect();
  }
}
