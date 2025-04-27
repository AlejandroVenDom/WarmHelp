package com.WebSocket.WebSocket.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String email;

    @OneToMany(mappedBy = "sender", cascade = CascadeType.ALL)
    private Set<Message> sentMessages;

    @OneToMany(mappedBy = "receiver", cascade = CascadeType.ALL)
    private Set<Message> receivedMessages;

    @ManyToMany(mappedBy = "members")
    private Set<GroupChat> groupChats;

//    @ManyToOne
//    @JoinColumn(name = "role_id", nullable = false)
//    private Role role;

    @CreationTimestamp
    @Column(nullable = false)
    private LocalDateTime createdAt ;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt ;

    @Column(nullable = true)
    private LocalDateTime deletedAt;

}
