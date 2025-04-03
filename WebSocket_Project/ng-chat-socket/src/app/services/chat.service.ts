import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { ChatMessage } from '../models/chat-message';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private stompClient: any
  private messageSubject: BehaviorSubject<ChatMessage[]> = new BehaviorSubject<ChatMessage[]>([]);

  constructor() { 
    this.initConnectionSocket();
   }

  // Funcion en el que se ejecutara para iniciar la conexion con el socket [ tipo de conexion tcp]
  initConnectionSocket(){
    const url = 'http://localhost:3000/chat-socket'; // url del socket en el cual configuramos en el backend de configuration
    const socket = new SockJS(url); // referenciar a la libreria que se instalo previmente y le damos el parametro de url
    this.stompClient = Stomp.over(socket) // Con todo esto ya estamos instanciando la conexion con el socket [ En caso de que el Stomp no se importe automaticamente, se debe instanciar manualmente]
  }

  // Metodo para unirnos a una room [ sala ]
  joinRoom(roomId: string){
    this.stompClient.connect({}, ()=>{
      // Aqui se hara la conexion a la room
      this.stompClient.subscribe(`/topic/${roomId}`, (messages:any)=> {
        const messageContent = JSON.parse(messages.body);
        const currentMessage = this.messageSubject.getValue();
        currentMessage.push(messageContent);

        this.messageSubject.next(currentMessage); 
      })
    })
  }

  sendMessage(roomId: string, chatMessage: ChatMessage){
    this.stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(chatMessage))
  }

  // Metodo para retornar este Subject
  getMessageSubject(){
    return this.messageSubject.asObservable();
  }
}
