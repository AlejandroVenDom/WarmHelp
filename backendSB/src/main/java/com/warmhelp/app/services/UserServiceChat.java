package com.warmhelp.app.services;

import com.warmhelp.app.exceptions.UserAlreadyExistException;
import com.warmhelp.app.exceptions.UserNotFoundException;
import com.warmhelp.app.models.User;

import java.util.List;

public interface UserServiceChat {
    List<User> getall() throws UserNotFoundException;

    User addUser(User user) throws UserAlreadyExistException;

    User getUserByUserName(String username)  throws UserNotFoundException;
}
