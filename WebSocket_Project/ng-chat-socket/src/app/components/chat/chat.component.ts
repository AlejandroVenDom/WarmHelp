import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ FormsModule, NgFor],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  newMessage: string = '';

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit(): void {
    // Conectar al WebSocket cuando el componente se inicializa
    this.webSocketService.connect();

    // Recibir los mensajes del WebSocket
    this.webSocketService.getMessages().subscribe((message) => {
      this.messages.push(message);
      console.log('Nuevo mensaje recibido:', message);
    });
  }

  // Enviar un mensaje
  sendMessage(): void {
    const message = {
      sender: 'juan', // Cambiar según el usuario
      receiver: 'pedro', // O el ID del grupo si es un chat grupal
      content: this.newMessage,
      type: 'CHAT'
    };
    this.webSocketService.sendMessage(message);
    this.newMessage = ''; // Limpiar el campo de entrada
  }
}
