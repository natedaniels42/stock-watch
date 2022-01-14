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

  /**
   * Sets the socket to the specific url holding the socket server
   */
  constructor() { 
    this.socket = io(this.localUrl);
  }

  /**
   * Creates a listener for our socket based on the eventName given
   * @param eventName - string
   * @returns - Observable
   */
  listen(eventName: string) {
    return new Observable((observer) => {
      this.socket.on(eventName, (data) => {
        observer.next(data);
      })
    })
  }

  /**
   * Calls the socket with a request for data
   * @param eventName - string
   * @param data - any
   */
  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}
