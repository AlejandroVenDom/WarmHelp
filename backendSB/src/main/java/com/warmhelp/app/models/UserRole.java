package com.warmhelp.app.models;

import com.warmhelp.app.enums.RoleType;
import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
public class UserRole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RoleType roleType;

}
