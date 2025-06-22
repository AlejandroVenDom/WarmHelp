package com.warmhelp.app.services;

import com.warmhelp.app.exceptions.UserAlreadyExistException;
import com.warmhelp.app.exceptions.UserNotFoundException;
import com.warmhelp.app.models.User;

import java.util.List;
import java.util.Optional;

public interface UserServiceChat {
    User saveUser(User user);
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    User getById(Long id) throws UserNotFoundException;
    List<User> findAllUsers();
    void deleteUserById(Long id) throws UserNotFoundException;
    void updateUsername(Long id, String newUsername) throws UserNotFoundException;
}
