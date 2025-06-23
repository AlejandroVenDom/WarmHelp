package com.warmhelp.app.services;

import com.warmhelp.app.exceptions.UserAlreadyExistException;
import com.warmhelp.app.exceptions.UserNotFoundException;
import com.warmhelp.app.models.User;
import com.warmhelp.app.repositories.UserChatRepository;
import com.warmhelp.app.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceChatImpl implements UserServiceChat{

    @Autowired
    private UserRepository userRepository;

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User getById(Long id) throws UserNotFoundException {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User with id " + id + " not found"));
    }

    @Override
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public void deleteUserById(Long id) throws UserNotFoundException {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException("User with id " + id + " not found");
        }
        userRepository.deleteById(id);
    }

    @Override
    public void updateUsername(Long id, String newUsername) throws UserNotFoundException {
        User user = getById(id);
        user.setUsername(newUsername);
        userRepository.save(user);
    }
}
