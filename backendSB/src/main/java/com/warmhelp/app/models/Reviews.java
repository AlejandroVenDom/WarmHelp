package com.warmhelp.app.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.warmhelp.app.enums.CalificationType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
@Getter
@Setter
public class Reviews {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "userInfo_id", nullable = false)
    @JsonBackReference
    private UserInfo userInfo;

    @ManyToOne
    @JoinColumn(name = "professionalServices_id", nullable = false)
    @JsonBackReference
    private ProfessionalServices professionalServices;

    @ManyToOne
    @JoinColumn(name = "calification_id", nullable = false)
    private Calification calification;

    @Column(nullable = false)
    private String description;

    @CreationTimestamp
    @Column(nullable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = true)
    private LocalDateTime updatedAt;

    @Column(nullable = true)
    private LocalDateTime deletedAt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserInfo getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(UserInfo userInfo) {
        this.userInfo = userInfo;
    }

    public ProfessionalServices getProfessionalServices() {
        return professionalServices;
    }

    public void setProfessionalServices(ProfessionalServices professionalServices) {
        this.professionalServices = professionalServices;
    }

    public Calification getCalification() {
        return calification;
    }

    public void setCalification(Calification calification) {
        this.calification = calification;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public LocalDateTime getDeletedAt() {
        return deletedAt;
    }

    public void setDeletedAt(LocalDateTime deletedAt) {
        this.deletedAt = deletedAt;
    }
}
