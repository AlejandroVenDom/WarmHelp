package com.WebSocket.WebSocket.service;

import com.WebSocket.WebSocket.model.User;
import com.WebSocket.WebSocket.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Registrar un nuevo usuario
    public User registerUser(User user) {
        return userRepository.save(user);
    }

    // Buscar un usuario por su username
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // Buscar un usuario por su email
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }
}
