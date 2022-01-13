import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private localUrl = 'http://localhost:4000';
  private deployedUrl = 'https://stockwatch-socket.herokuapp.com';
  private socket: Socket;

  constructor() { 
    this.socket = io(this.localUrl);
  }

  listen(eventName: string) {
    return new Observable((observer) => {
      this.socket.on(eventName, (data) => {
        observer.next(data);
      })
    })
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}
