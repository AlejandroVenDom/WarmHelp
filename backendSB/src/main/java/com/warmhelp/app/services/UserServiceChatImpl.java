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
    private UserChatRepository userChatRepository;


    @Override
    public List<User> getall() throws UserNotFoundException {
        List<User> users=userChatRepository.findAll();
        if (users.isEmpty()){
            throw new UserNotFoundException();
        }else {
            return users;
        }
    }

    @Override
    public User addUser(User user) throws UserAlreadyExistException {
        Optional<User> user1=userChatRepository.findById(user.getUsername());

        if (user1.isPresent()){
            throw new UserAlreadyExistException();
        }else {
            return userChatRepository.save(user);
        }
    }

    @Override
    public User getUserByUserName(String username) throws UserNotFoundException {
        Optional<User> user1=userChatRepository.findById(username);

        if (user1.isPresent()){
            return user1.get();
        }else {
            throw new UserNotFoundException();
        }
    }
}
