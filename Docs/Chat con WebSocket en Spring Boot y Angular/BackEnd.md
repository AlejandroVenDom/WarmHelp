Crearemos un proyecto Spring corriente y en dependencies le agregaremos el dependency de [Spring Boot Started WebSocket](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-websocket/3.4.4) luego crearemos 3 carpetas llamadas.
- configuration
 - Tendremos una clase de java de WebSocketConfiguration
 - Agregaremos anotaciones, entre ellas la segunda anotación estará disponible si se actualizo correctamente la dependency que se mostro anteriormente, esta anotación nos permitirá configurar el broker para la comunicacion con los clientes, Luego implementamos la clase WebSocketMessageBrokerConfigurer, en el cual nos pedira implementar unos metodos los cuales son los que se muestran en el codigo.
 - El primer metodo servira para habilitar un broker para que el cliente se comunique con el BackEnd y como usamos el WebSocket se utilizara el broker[ El broker es el responsable de permitr una comunicacion entre los clientes y el servidor a traves de un puerto liberado ] 
	 - El contenido del codigo dice que habilite un broker y que se pueda ingresar mediante la path "/topic"
	 - Luego establece un path de destino de mensajes, por donde la aplicaion estara destinando los mensajes ("/app")
- El segundo metodo permitira registrar los EndPoints
	- Permite que el FrontEnd con que path va a conectarse con el servidor socket
	- El otro le dara permisos y mapear que clientes pueden conectarse a este endPoint, 
```
package com.WebSocket.WebSocket.configuration;  
  
import org.springframework.context.annotation.Configuration;  
import org.springframework.messaging.simp.config.MessageBrokerRegistry;  
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;  
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;  
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;  
  
@Configuration  
@EnableWebSocketMessageBroker  
public class WebSocketConfiguration implements WebSocketMessageBrokerConfigurer {  
    @Override  
    public void configureMessageBroker(MessageBrokerRegistry registry){  
        registry.enableSimpleBroker("/topic");  
        registry.setApplicationDestinationPrefixes("/app");  
    }  
    @Override  
    public void registerStompEndpoints(StompEndpointRegistry registry){  
    registry.addEndpoint("/chat-socket")  
            .setAllowedOrigins("http://localhost:4200")  
            .withSockJS();  
    }  
}
```
- controller
	- Tendremos una clase WebSocketController
		- El metodo retornara el mensaje de una sala y los reenvia 
```
package com.WebSocket.WebSocket.controller;  
  
import com.WebSocket.WebSocket.dto.ChatMessage;  
import org.springframework.messaging.handler.annotation.DestinationVariable;  
import org.springframework.messaging.handler.annotation.MessageMapping;  
import org.springframework.messaging.handler.annotation.SendTo;  
import org.springframework.stereotype.Controller;  
import org.springframework.web.bind.annotation.CrossOrigin;  
  
@Controller  
// @CrossOrigin(origins = "http://localhost:4200")  
public class WebSocketController {  
  
    @MessageMapping("/chat/{roomId}")  
    @SendTo("/topic/{roomId}")  
    public ChatMessage chat(@DestinationVariable String roomId, ChatMessage message){  
        System.out.println(message);  
        return new ChatMessage(message.getMessage(), message.getUser());  
    }  
}
```
- dto
	- Tendremos una clase ChatMessage
		- String message: variable que contendra el mensaje
		- String user: variable del usuario
```
package com.WebSocket.WebSocket.dto;  
  
import lombok.AllArgsConstructor;  
import lombok.Data;  
  
@Data  
@AllArgsConstructor  
public class ChatMessage {  
    String message;  
    String user;  
}
```

Luego se levanta el back y nos debera salir una pantalla blanca con un error page, esto significa que esta correctamente levantado, solo que no se tiene un html en la pagina principal del socket por eso el error, para ir al chat ingresaremos con http://localhost:3000/chat-socket y listo.