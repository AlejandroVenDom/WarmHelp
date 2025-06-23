import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Chat } from '../interfaces/chat';
import { Message } from '../interfaces/message';
import { Client, IMessage, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private REST_URL = 'http://localhost:8080/api/chats';
  private MESSAGE_URL = 'http://localhost:8080/api/messages';
  private socketUrl = 'http://localhost:8080/api/chat';

  private stompClient: Client | null = null;

  constructor(private http: HttpClient) {}

  getChatsByUser(username: string): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${this.REST_URL}/user/username/${username}`);
  }
  sendMessageHttp(request: {
    chatId: number;
    senderId: number;
    content: string;
  }): Observable<Message> {
    return this.http.post<Message>(`${this.MESSAGE_URL}`, request);
  }

  getMessagesFromChat(chatId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.REST_URL}/${chatId}/messages`);
  }

  getOrCreateChatBetweenUsers(user1: string, user2: string): Observable<Chat> {
    return this.http.post<Chat>(`${this.REST_URL}/between`, { user1, user2 });
  }

  createChat(chat: Chat): Observable<Chat> {
    return this.http.post<Chat>(this.REST_URL, chat);
  }
  deleteChat(chatId: number, username: string): Observable<void> {
  return this.http.delete<void>(`${this.REST_URL}/${chatId}?username=${username}`);
}

  sendMessageREST(chatId: number, message: Message): Observable<Chat> {
    return this.http.post<Chat>(`${this.REST_URL}/${chatId}/messages`, message);
  }

  connect(): void {
    const socket = new SockJS(this.socketUrl);
    this.stompClient = Stomp.over(socket);

    this.stompClient.activate();

    console.log('WebSocket conectado');
  }

  disconnect(): void {
    if (this.stompClient && this.stompClient.connected) {
      // Ahora disconnect devuelve una Promise
      this.stompClient.deactivate().then(() => {
        console.log('WebSocket desconectado');
      });
    }
  }

  sendMessage(message: Message): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination: '/app/chat.sendMessage',
        body: JSON.stringify(message),
      });
    }
  }

  subscribeToChat(chatId: number): Observable<Message> {
    return new Observable<Message>((subscriber) => {
      if (!this.stompClient) {
        subscriber.error('STOMP client no conectado');
        return;
      }

      let stompSubscription: any;

      const waitForConnection = () => {
        if (this.stompClient && this.stompClient.connected) {
          stompSubscription = this.stompClient.subscribe(
            `/topic/chat.${chatId}`,
            (msg) => {
              subscriber.next(JSON.parse(msg.body));
            }
          );
        } else {
          setTimeout(waitForConnection, 100);
        }
      };

      waitForConnection();

      // Cleanup al desuscribirse del Observable
      return () => {
        if (stompSubscription) {
          stompSubscription.unsubscribe();
        }
      };
    });
  }
  subscribeToChatDeletion(chatId: number): Observable<number> {
  return new Observable<number>((subscriber) => {
    if (!this.stompClient) {
      subscriber.error('STOMP client no conectado');
      return;
    }

    let stompSubscription: any;

    const waitForConnection = () => {
      if (this.stompClient && this.stompClient.connected) {
        stompSubscription = this.stompClient.subscribe(
          `/topic/chat.deleted.${chatId}`,
          (msg) => {
            const deletedChatId = Number(msg.body);
            subscriber.next(deletedChatId);
          }
        );
      } else {
        setTimeout(waitForConnection, 100);
      }
    };

    waitForConnection();

    // Cleanup al desuscribirse
    return () => {
      if (stompSubscription) {
        stompSubscription.unsubscribe();
      }
    };
  });
}
subscribeToGlobalChatDeletion(): Observable<number> {
  return new Observable<number>((subscriber) => {
    if (!this.stompClient) {
      subscriber.error('STOMP client no conectado');
      return;
    }

    let stompSubscription: any;

    const waitForConnection = () => {
      if (this.stompClient && this.stompClient.connected) {
        stompSubscription = this.stompClient.subscribe(
          `/topic/chat.deleted`,
          (msg) => {
            const deletedChatId = Number(msg.body);
            subscriber.next(deletedChatId);
          }
        );
      } else {
        setTimeout(waitForConnection, 100);
      }
    };

    waitForConnection();

    return () => {
      if (stompSubscription) {
        stompSubscription.unsubscribe();
      }
    };
  });
}


}
