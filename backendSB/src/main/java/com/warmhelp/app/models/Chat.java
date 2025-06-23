package com.warmhelp.app.models;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="chats")
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
//    private int chatId;
    @ManyToMany
    private Set<User> participants = new HashSet<>();

    @OneToMany(mappedBy = "chat", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Message> messages = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name= "first_user_id", nullable = false)
    private User firstUser;

    public void setId(Long id) {
        this.id = id;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    public Set<User> getParticipants() {
        return participants;
    }

    public void setParticipants(Set<User> participants) {
        this.participants = participants;
    }

    @ManyToOne
    @JoinColumn(name = "second_user_id", nullable = false)
    private User secondUser;

    @OneToMany(mappedBy = "chat", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Message> messageList;

    public Chat() {
    }

    public Chat(int chatId, String firstUserName, String secondUserName, List<Message> messageList) {
//        this.chatId = chatId;
//        this.firstUserName = firstUserName;
//        this.secondUserName = secondUserName;
        this.messageList = messageList;
    }

//    public int getChatId() {
//        return chatId;
//    }
//
//    public void setChatId(int chatId) {
//        this.chatId = chatId;
//    }

//    public String getFirstUserName() {
//        return firstUserName;
//    }

//    public void setFirstUserName(String firstUserName) {
//        this.firstUserName = firstUserName;
//    }

//    public String getSecondUserName() {
//        return secondUserName;
//    }

//    public void setSecondUserName(String secondUserName) {
//        this.secondUserName = secondUserName;
//    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getFirstUser() {
        return firstUser;
    }

    public void setFirstUser(User firstUser) {
        this.firstUser = firstUser;
    }

    public User getSecondUser() {
        return secondUser;
    }

    public void setSecondUser(User secondUser) {
        this.secondUser = secondUser;
    }

    public List<Message> getMessageList() {
        return messageList;
    }

    public void setMessageList(List<Message> messageList) {
        this.messageList = messageList;
    }
}
