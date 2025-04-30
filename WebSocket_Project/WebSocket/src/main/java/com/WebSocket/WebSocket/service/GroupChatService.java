package com.WebSocket.WebSocket.service;

import com.WebSocket.WebSocket.model.GroupChat;
import com.WebSocket.WebSocket.model.User;
import com.WebSocket.WebSocket.repository.GroupChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class GroupChatService {

    private final GroupChatRepository groupChatRepository;

    @Autowired
    public GroupChatService(GroupChatRepository groupChatRepository) {
        this.groupChatRepository = groupChatRepository;
    }

    // Crear un nuevo grupo
    public GroupChat createGroup(String name, Set<User> users) {
        GroupChat group = new GroupChat();
        group.setName(name);
        group.setMembers(users != null ? users : new HashSet<>());
        return groupChatRepository.save(group);
    }

    // Obtener todos los grupos (si lo deseas)
    public Set<GroupChat> getAllGroups() {
        return new HashSet<>(groupChatRepository.findAll());
    }

    // Obtener un grupo por ID
    public GroupChat getGroupById(Long groupId) {
        return groupChatRepository.findById(groupId).orElse(null);
    }
}
