import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Chat } from '../../services/interfaces/chat';
import { ChatService } from '../../services/chat/chat.service';
import { Message } from '../../services/interfaces/message';
import { Subscription } from 'rxjs';
import { UserInterface } from '../../services/interfaces/auth';
import { UserService } from '../../services/users/user.service';
import { User } from '../../services/interfaces/user';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

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
  showChats = true;
  showNewChat = true;


  private chatSubscription?: Subscription;

  constructor(
    private chatService: ChatService,
    private userService: UserService,
    private router: Router,
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
      idUser: userObj.id, // Mapeo explícito
    };
  } else {
    this.currentUser = null;
  }

  // ⚠️ No llames más a getAllUsers aquí → se hace dentro de loadChats()

  // Suscripción global a eliminación de chats
  this.chatService.subscribeToGlobalChatDeletion().subscribe({
    next: (deletedChatId) => {
      this.handleChatDeletion(deletedChatId);

      if (this.currentChat?.id === deletedChatId) {
        this.currentChat = null;
        this.messages = [];
      }

      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('Error en la suscripción global de chat deleted:', err);
    }
  });
  this.showChats = JSON.parse(localStorage.getItem('showChats') ?? 'true');
  this.showNewChat = JSON.parse(localStorage.getItem('showNewChat') ?? 'true');
}
toggleChats() {
  this.showChats = !this.showChats;
  localStorage.setItem('showChats', JSON.stringify(this.showChats));
}

toggleNewChats() {
  this.showNewChat = !this.showNewChat;
  localStorage.setItem('showNewChat', JSON.stringify(this.showNewChat));
}



  ngOnDestroy(): void {
    this.chatSubscription?.unsubscribe();
    this.chatService.disconnect();
  }

  loadChats(): void {
  if (!this.currentUser) return;

  this.chatService.getChatsByUser(this.currentUser.username).subscribe((chats) => {
    this.chatList = chats;

    const alreadyChattedUsernames = new Set<string>(
      chats
        .map(chat => this.getChatOpponent(chat)?.username)
        .filter((u): u is string => !!u)
    );

    this.userService.getAllUsers().subscribe((allUsers) => {
      this.users = allUsers
        .filter(user =>
          user.username !== this.currentUser?.username &&
          !alreadyChattedUsernames.has(user.username)
        )
        .sort((a, b) => a.username.localeCompare(b.username));
    });

    if (chats.length > 0) {
      this.selectChat(chats[0]);
    }
  });
}


getChatOpponent(chat: Chat): User | null {
  if (!this.currentUser) return null;
  return chat.firstUser.username === this.currentUser.username
    ? chat.secondUser
    : chat.firstUser;
}

deleteChat(chat: Chat): void {
  if (!confirm('¿Estás seguro de que deseas eliminar este chat?')) return;
  if (!this.currentUser) return;

  this.handleChatDeletion(chat.id); // eliminamos visualmente

  this.chatService.deleteChat(chat.id, this.currentUser.username).subscribe({
    next: () => {
      console.log('✅ Chat eliminado en backend');
      this.loadChats(); // <<--- Vuelve a cargar usuarios actualizados
    },
    error: (err) => {
      console.error('❌ Error eliminando chat:', err);
      this.loadChats(); // recarga de todos modos por seguridad
    },
  });
}


handleChatDeletion(deletedChatId: number): void {
  const updatedList = this.chatList.filter((c) => c.id !== deletedChatId);
  this.chatList = [...updatedList]; // forzamos el cambio por referencia

  if (this.currentChat?.id === deletedChatId) {
    this.currentChat = null;
    this.messages = [];
  }

  this.cdr.detectChanges(); // asegura que la vista se actualice
}




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

  // Limpiar suscripción anterior a mensajes
  this.chatSubscription?.unsubscribe();

  // Cargar mensajes del chat seleccionado
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

  // Suscripción a nuevos mensajes vía WebSocket
  this.chatSubscription = this.chatService.subscribeToChat(chat.id).subscribe({
    next: (message) => {
      this.messages = [...this.messages, message];
      console.log('Mensaje recibido por WS:', message);
      this.cdr.detectChanges(); // actualiza la vista
    },
    error: (err) => {
      console.error('Error en suscripción WS:', err);
    },
    complete: () => {
      console.log('Suscripción WS completada');
    },
  });

  // 🚨 NUEVO: Suscripción a la eliminación del chat por el otro usuario
  this.chatService.subscribeToChatDeletion(chat.id).subscribe({
    next: (deletedChatId) => {
      console.warn('Chat eliminado desde otro lado:', deletedChatId);

      if (this.currentChat?.id === deletedChatId) {
        this.currentChat = null;
        this.messages = [];
      }

      this.chatList = this.chatList.filter(c => c.id !== deletedChatId);
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('Error al escuchar eliminación por WS:', err);
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

          // 🔥 ACTUALIZAR lista de usuarios al instante
          this.users = this.users.filter(u => u.username !== user.username);
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
  getAvatarUrl(avatarPath: string | undefined): string {
  if (!avatarPath) return '/ken.gif';
  return avatarPath.startsWith('http')
    ? avatarPath
    : `${environment.apiUrl}${avatarPath}`;
}

onImageError(event: Event): void {
  const img = event.target as HTMLImageElement;
  if (!img.src.includes('image-not-found.jpg') && !img.src.includes('/ken.gif')) {
    img.src = '/assets/image-not-found.jpg';
  }
}
  verPerfilPublico(username?: string): void {
  if (username) {
    this.router.navigate(['/perfil-publico', username]);
  }
}
}
