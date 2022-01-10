import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private url = 'http://localhost:4000';
  private socket: Socket;

  constructor() { 
    this.socket = io(this.url);
  }

  listen(eventName: string) {
    return new Observable((observer) => {
      this.socket.once(eventName, (data) => {
        observer.next(data);
      })
    })
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}
