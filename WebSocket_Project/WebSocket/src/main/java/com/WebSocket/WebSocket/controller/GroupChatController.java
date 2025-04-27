package com.WebSocket.WebSocket.controller;

import com.WebSocket.WebSocket.model.GroupChat;
import com.WebSocket.WebSocket.model.User;
import com.WebSocket.WebSocket.service.GroupChatService;
import com.WebSocket.WebSocket.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/api/groups")
public class GroupChatController {

    private final GroupChatService groupChatService;
    private final UserService userService;

    @Autowired
    public GroupChatController(GroupChatService groupChatService, UserService userService) {
        this.groupChatService = groupChatService;
        this.userService = userService;
    }

    // Crear un grupo
    @PostMapping("/create")
    public ResponseEntity<GroupChat> createGroup(@RequestParam String groupName,
                                                 @RequestParam Set<Long> userIds) {
        Set<User> users = new HashSet<>();
        for (Long userId : userIds) {
            userService.findById(userId).ifPresent(users::add);
        }

        if (users.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        GroupChat groupChat = groupChatService.createGroup(groupName, users);
        return ResponseEntity.ok(groupChat);
    }

    // Obtener todos los grupos
    @GetMapping("/")
    public ResponseEntity<Set<GroupChat>> getAllGroups() {
        Set<GroupChat> groups = groupChatService.getAllGroups();
        return ResponseEntity.ok(groups);
    }

    // Obtener grupo por ID
    @GetMapping("/{groupId}")
    public ResponseEntity<GroupChat> getGroup(@PathVariable Long groupId) {
        GroupChat group = groupChatService.getGroupById(groupId);
        return group != null ? ResponseEntity.ok(group) : ResponseEntity.notFound().build();
    }
}

//@Controller
// @CrossOrigin(origins = "http://localhost:4200")
//public class WebSocketController {
//
//    @MessageMapping("/chat/{roomId}")
//    @SendTo("/topic/{roomId}")
//    public ChatMessage chat(@DestinationVariable String roomId, ChatMessage message){
//        System.out.println(message);
//        // return new ChatMessage(message.getMessage(), message.get());
//        return message;
//    }
//}
