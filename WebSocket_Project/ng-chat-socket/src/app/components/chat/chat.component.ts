import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../models/chat-message';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, NgFor, NgClass],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
   
  messageInput: string = '';
  userId: string = '';
  messageList: any[]= [];

  constructor (private chatService: ChatService,
    private route: ActivatedRoute // Permite capturar parametros desde la url
  ){
  }
  ngOnInit(): void {
    this.userId = this.route.snapshot.params["userId"];
    this.chatService.joinRoom("ABC")    // Que se una a la sala llamada ABC
    this.listenerMessage();
  }
  // Metodo para enviar el mensaje
  sendMessage(){
    const chatMessage = {
      message: this.messageInput,
      user: this.userId
    } as ChatMessage
    this.chatService.sendMessage("ABC", chatMessage);
    this.messageInput = '';
  }

  listenerMessage(){
    this.chatService.getMessageSubject().subscribe((messages:any) => {
      this.messageList = messages.map((item:any) =>( {
        ...item,
        message_side: item.user === this.userId ? 'sender': 'receiver'
      }))
    });
  }
}
