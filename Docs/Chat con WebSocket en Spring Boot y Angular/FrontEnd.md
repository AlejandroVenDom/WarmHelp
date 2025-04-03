Usaremos Angular como Front para que los usuarios tengan una conexión con el back, antes de ello tendremos que agregar 3 librerías de .Ts a través de la terminal:

- npm i @stomp/stompjs
- npm i sockjs-client
- npm i --save @types/sockjs-client

Al tener las 3 librerías instaladas creamos 1 componente llamado chat, 1 interface llamada chat-message y 1 servicio llamado chat.

Luego en el app.component.html tendremos solamente el <router-outlet><router-outlet> En las rutas tendremos 1 que es la del ChatComponent, donde se conectaran los distintos usuarios a una room. {path: 'chat/:userId', component: ChatComponent}

Empezando con el service de chat, se usara para conectarse con el socket

- chat.service.ts
    
    1. **`constructorionSocket`()**
        - Al inicializar el servicio le indicamos que inicie la conexión
    2. **`initConnectionSocket`()**
        - Es la que se encarga de iniciar la conexión con el servidor WebSocket
            - Usa SockJS para conectarse a la url del servidor para conectarse al socket (`http://localhost:3000/chat-socket`).
            - Usa`Stomp` sobre esa conexión para manejar el protocolo STOMP (mensajería sobre WebSocket).
    3. **`joinRoom(roomId: string`)**
        - Une al usuario a la room de chat específica.
            - Se conecta al servidor WebSocket y se suscribe al tema (`/topic/{roomId}`).
            - Cada vez que llega un mensaje nuevo a la sala, lo añade al `BehaviorSubject` para notificar a los componentes suscritos.
    4. **`sendMessage(roomId: string, chatMessage: ChatMessage`)**
        - Envía un mensaje a una sala específica.
        - Usa `stompClient.send()` para publicar el mensaje en la ruta `/app/chat/{roomId}` (que el backend procesará).
    5. **`getMessageSubject()`**
    
    - Permite a otros componentes suscribirse a los nuevos mensajes.
    - Retorna el `BehaviorSubject` como un `Observable`, para que los componentes puedan reaccionar cuando lleguen mensajes nuevos.
    
    Aqui el codigo
    
    - chat.service.ts
        
        ```
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
          private messageSubject: BehaviorSubject<ChatMessage[]> = new BehaviorSubject<ChatMessage[]>([]); // Es un tipo especial de BehaviorSubject, en este caso almacena un array de mensajes de chat
        
          constructor() { 
            this.initConnectionSocket();
           }
        
          // Funcion en el que se ejecutara para iniciar la conexion con el socket [ tipo de conexion tcp]
          initConnectionSocket(){
            const url = '<http://localhost:3000/chat-socket>'; // url del socket en el cual configuramos en el backend de configuration
            const socket = new SockJS(url); // referenciar a la libreria que se instalo previmente y le damos el parametro de url
            this.stompClient = Stomp.over(socket) // Con todo esto ya estamos instanciando la conexion con el socket [ En caso de que el Stomp no se importe automaticamente, se debe instanciar manualmente]
          }
        
          // Metodo para unirnos a una room [ sala ]
          joinRoom(roomId: string){
            this.stompClient.connect({}, ()=>{
              // Aqui se hara la conexion a la room para que no todos los user que se conecten al socket puedan ver los mensajes, solamente los que estan en la room
              this.stompClient.subscribe(`/topic/${roomId}`, (messages:any)=> {
              // dentro de este arrow function es simplemente para recibir los mensajes
                const messageContent = JSON.parse(messages.body);
        	        const currentMessage = this.messageSubject.getValue(); // captura los mensajes que tiene en memoria
                currentMessage.push(messageContent); // agregar los mensaje que vienen desde el servidor
        
                this.messageSubject.next(currentMessage); // envia mensajes actuales [ Esto muestra los mensajes de memoria y los que envies y/o reciba ]
              })
            })
          }
        
        	// recibira la id de la room, luego el cuerpo del chat [ el chatMessage viene desde la interface ]
          sendMessage(roomId: string, chatMessage: ChatMessage){
            this.stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(chatMessage))
          }
        
          // Metodo para retornar este Subject
          getMessageSubject(){
            return this.messageSubject.asObservable();
          }
        }
        
        ```
        

Siguiendo con el chat.component.ts

- chat.component.ts
    
    En nuestro ts de chat.component inyectaremos el servicio en nuestro constructor e implementamos el OnInit para inicializar nuestra conexion con el socket.
    
    1. **`ngOnInit()`**
        - Es lo primero que se ejecuta cuando el componente se inicia. Prepara todo para el chat
            - **Obtiene el `userId`**: De la URL ( `/chat/1`, extrae `1`)
            - **Se une al chat**: Llama al servicio para conectarse a la sala llamada `"ABC"`
            - **Activa el "listenerMessage"**: Para recibir mensajes nuevos automáticamente
    2. **`sendMessage()`**
        - Crea el mensaje
        - Lo manda al servidor
        - Limpia el input
    3. **`listenerMessage`()**
        - Escucha los mensajes nuevos que llegan al chat y los muestra
        - Procede cada mensaje
            - Si **eres tú** el que lo envió (`user === userId`), lo marca como `"sender"`.
            - Si es de **otra persona**, lo marca como `"receiver"`.
        - **Actualiza la lista de mensajes**: Para que se vean en la pantalla
    
    Aqui el codigo
    
    - chat.component.ts
        
        ```
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
           
          messageInput: string = ''; // contenido del mensaje 
          userId: string = ''; // capturar el usuario de la url
          messageList: any[]= []; // capturar todos los mensajes del servidor
        
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
              message: this.messageInput, // texto que se escribio
              user: this.userId // el id del user
            } as ChatMessage // que tipo es la interface
            this.chatService.sendMessage("ABC", chatMessage); // Envía a la sala "ABC"
            this.messageInput = ''; // Limpia el input
          }
        
          listenerMessage(){
            this.chatService.getMessageSubject().subscribe((messages:any) => {
              this.messageList = messages.map((item:any) =>( { 
                ...item,
                message_side: item.user === this.userId ? 'sender': 'receiver' // esto valida quien es el usuario que envia el mensaje, en cada caso el diseño cambiara en base a quien es el que envia y/o recibe
              }))
            });
          }
        }
        
        ```
        

Y la interface

- chat-message
    
    ```tsx
    export interface ChatMessage {
        message: string,
        user: string,
    }
    ```
    

Luego del chat.component.ts nos dara error porque la libreria @stomp/stompjs esta diseñado para consumirlo desde el servidor y nosotros lo hacemos desde un cliente, por ello en el index.html agregaremos un script

```html
<script>
    var global = global || window
 </script>
```

La cual dice que la libreria se consumira desde un cliente

## HTML

En la parte de chat.component.html tendremos lo que se define cómo se muestran los mensajes en la interfaz del chat.

- **`*ngFor="let item of messageList"`**
    
    - Itera sobre todos los mensajes en `messageList` el cual captura todos los mensajes del servidor
    - **`{{item.message}}`**: Muestra el contenido del mensaje
    - **`[ngClass]`**: Decide si el mensaje va a la izquierda (`receiver`) o derecha (`sender`).
    - En caso de no usar el **`ngClass`** se tendría que crear 2 <li> por separado uno con atributo de receiver y otro con sender
- chat.component.
    
    ```html
    <div class="chat_window">
        <div class="top_menu">
          <div class="buttons">
            <div class="button close"></div>
            <div class="button minimize"></div>
            <div class="button maximize"></div>
          </div>
          <div class="title">
            <img src="/whatsapp.png" width="25px" height="25px">
            WhatsApp
          </div>
        </div>
        <ul class="messages">
            <!-- <li class="message left"> // Mensaje para que aparezca a la izquierda -->
            <li class="message right" *ngFor="let item of messageList"
            [ngClass]="{'left': item.message_side === 'receiver', 'right': item.message_side === 'sender' }"
            >
            <div class="avatar"></div>
            <div class="text_wrapper">
              <div class="text">{{item.message}}</div>
            </div>
          </li>
        </ul>
        <div class="bottom_wrapper clearfix">
          <div class="message_input_wrapper">
            <input class="message_input" placeholder="Message..." [(ngModel)]="messageInput" />
          </div>
          <div class="send_message" (click)="sendMessage()">
            <div class="icon"></div>
            <div class="text">Send</div>
          </div>
        </div>
      </div>
    ```