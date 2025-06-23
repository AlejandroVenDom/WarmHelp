import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Chat } from '../../services/interfaces/chat';
import { ChatService } from '../../services/chat/chat.service';
import { Message } from '../../services/interfaces/message';
import { Subscription } from 'rxjs';
import { UserInterface } from '../../services/interfaces/auth';
import { UserService } from '../../services/users/user.service';

@Component({
  selector: 'app-chat',
  standalone: false,
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  currentUser: UserInterface | null = null; // Usuario autenticado
  users: UserInterface[] = [];
  chatList: Chat[] = [];
  currentChat: Chat | null = null;
  messages: Message[] = [];
  newMessage = '';

  private chatSubscription?: Subscription;

  constructor(
    private chatService: ChatService,
    private userService: UserService,
    private cdr: ChangeDetectorRef // Inyectar ChangeDetectorRef
  ) {
    this.currentUser = this.userService.getCurrentUser();
  }

  ngOnInit(): void {
    this.chatService.connect();
    setTimeout(() => {
      this.loadChats();
    }, 500);

    const userJson = sessionStorage.getItem('warmhelp_user');
    if (userJson) {
      const userObj = JSON.parse(userJson);
      this.currentUser = {
        ...userObj,
        idUser: userObj.id, // Mapeo explícito de id a idUser
      };
    } else {
      this.currentUser = null;
    }

    // const userJson = sessionStorage.getItem('warmhelp_user');
    // if (userJson) {
    //   this.currentUser = JSON.parse(userJson);
    // } else {
    //   this.currentUser = null;
    // }
    // console.log('Usuario actual:', this.currentUser);

    this.loadChats();

    this.userService.getAllUsers().subscribe((data) => {
      // Opcional: excluir al usuario actual de la lista
      this.users = data.filter(
        (u) => u.username !== this.currentUser?.username
      );
      console.log('Usuarios cargados:', this.users);
    });
  }

  ngOnDestroy(): void {
    this.chatSubscription?.unsubscribe();
    this.chatService.disconnect();
  }

  loadChats(): void {
    if (!this.currentUser) return;

    this.chatService
      .getChatsByUser(this.currentUser.username)
      .subscribe((chats) => {
        this.chatList = chats;
        if (chats.length > 0) {
          this.selectChat(chats[0]);
        }
      });
  }
  // getChatPartnerUsername(chat: Chat): string {
  //   if (!this.currentUser) return 'Usuario desconocido';

  //   const otherUser = chat.users.find(
  //     (user) => user.username !== this.currentUser?.username
  //   );

  //   return otherUser?.username || 'Sin usuario';
  // }
  getChatPartnerNames(chat: Chat): string {
    if (!this.currentUser || !chat) return '';

    const partnerNames = [];

    if (chat.firstUser?.username !== this.currentUser.username) {
      partnerNames.push(chat.firstUser.username);
    }

    if (chat.secondUser?.username !== this.currentUser.username) {
      partnerNames.push(chat.secondUser.username);
    }

    return partnerNames.join(', ') || 'Sin usuario';
  }

  selectChat(chat: Chat): void {
    console.log('Seleccionando chat...', chat);
    this.currentChat = chat;
    console.log('CurrentChat después de asignar:', this.currentChat);

    this.chatSubscription?.unsubscribe();

    console.log('Cargando mensajes del chat:', chat.id);
    this.chatService.getMessagesFromChat(chat.id).subscribe({
      next: (messages) => {
        this.messages = messages;
        console.log('Mensajes cargados:', this.messages);
      },
      error: (err) => {
        console.error('Error cargando mensajes:', err);
      },
      complete: () => {
        console.log('Carga de mensajes completada');
      },
    });

    this.chatSubscription = this.chatService
      .subscribeToChat(chat.id)
      .subscribe({
        next: (message) => {
          this.messages = [...this.messages, message];
          console.log('Mensaje recibido por WS:', message);
          this.cdr.detectChanges(); // fuerza la actualización
          console.log('Mensaje recibido por WS:', message);
        },
        error: (err) => {
          console.error('Error en suscripción WS:', err);
        },
        complete: () => {
          console.log('Suscripción WS completada');
        },
      });
  }
  // startChatWith(user: UserInterface): void {
  //   console.log('Intentando iniciar chat con:', user.username);
  //   if (!this.currentUser) return;

  //   this.chatService
  //     .getOrCreateChatBetweenUsers(this.currentUser.username, user.username)
  //     .subscribe((chat) => {
  //       if (!this.chatList.find((c) => c.id === chat.id)) {
  //         this.chatList.push(chat);
  //       }
  //       this.selectChat(chat);
  //     });
  // }
  createTestChat() {
    if (!this.currentUser || this.users.length === 0) {
      console.log('No hay usuarios para chatear o usuario actual no definido');
      return;
    }
    const userToChat = this.users[0];
    console.log('Creando chat con usuario:', userToChat.username);
    this.startChatWith(userToChat);
  }

  startChatWith(user: UserInterface): void {
    console.log('Intentando iniciar chat con:', user.username);
    if (!this.currentUser) {
      console.log('No hay usuario actual definido');
      return;
    }

    this.chatService
      .getOrCreateChatBetweenUsers(this.currentUser.username, user.username)
      .subscribe({
        next: (chat) => {
          console.log('Chat obtenido/creado:', chat);

          const existingChat = this.chatList.find((c) => c.id === chat.id);

          if (!existingChat) {
            console.log('Agregando chat a chatList');
            this.chatList.push(chat);
          } else {
            console.log('El chat ya existe en chatList');
          }

          console.log('Seleccionando chat...');
          this.selectChat(existingChat || chat);
        },
        error: (err) => {
          console.error('Error al crear/obtener chat:', err);
        },
      });
  }

  sendMessage(): void {
    if (!this.newMessage.trim() || !this.currentChat || !this.currentUser)
      return;

    const request = {
      chatId: this.currentChat.id,
      senderId: this.currentUser.idUser,
      content: this.newMessage.trim(),
    };

    const sender = {
      ...this.currentUser,
      id: this.currentUser.idUser, // mapeo idUser a id requerido
    };
    console.log('ID de usuario actual:', this.currentUser?.username);

    const message: Message = {
      content: this.newMessage.trim(),
      chat: this.currentChat,
      sender: sender, // Asegúrate que el backend lo espera
    };

    this.chatService.sendMessage(message);
    this.chatService.sendMessageHttp(request).subscribe({
      next: (savedMessage) => {
        console.log('Mensaje guardado en backend:', savedMessage);
        // Opcional: actualizar la lista con el mensaje guardado que viene del backend (puede incluir ID y timestamps)
        this.messages = [...this.messages, savedMessage];
      },
      error: (error) => {
        console.error('Error guardando mensaje:', error);
      },
    });
    console.log('Mensaje enviado:', message); // <-- Aquí el log

    this.newMessage = '';
  }

  isMyMessage(msg: Message): boolean {
    if (!msg.sender) return false; // o true, depende de tu lógica
    return msg.sender.username === this.currentUser?.username;
  }
}
