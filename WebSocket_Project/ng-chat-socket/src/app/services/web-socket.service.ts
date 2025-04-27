import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: any;
  private serverUrl = 'http://localhost:8080/ws'; // El endpoint del WebSocket
  private messageSubject: Subject<any> = new Subject<any>();

  constructor() {}

  // Conectar al WebSocket
  connect() {
  const socket = new SockJS(this.serverUrl);
  this.stompClient = Stomp.over(socket);

  this.stompClient.connect({}, (frame: any) => {
    console.log('Connected: ' + frame);

    // Suscripciones
    this.stompClient.subscribe('/topic/private', (message: any) => {
      this.messageSubject.next(JSON.parse(message.body));
    });

    this.stompClient.subscribe('/topic/group/1', (message: any) => {
      this.messageSubject.next(JSON.parse(message.body));
    });
  }, (error: any) => {
    console.error('WebSocket connection failed:', error);
    setTimeout(() => this.connect(), 5000); // Reintentar la conexión después de 5 segundos
  });
}


  // Enviar un mensaje
  sendMessage(message: any) {
    this.stompClient.send('/app/chat.send', {}, JSON.stringify(message));
  }

  // Recibir mensajes
  getMessages(): Observable<any> {
    return this.messageSubject.asObservable();
  }
}
