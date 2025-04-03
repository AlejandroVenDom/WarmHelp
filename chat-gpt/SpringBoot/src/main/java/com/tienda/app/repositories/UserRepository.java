package com.tienda.app.repositories;

import com.tienda.app.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Encontrar un usuario por username
    Optional<User> findByUsername(String username);

    // comprobar si existe un usuario por username
    boolean existsByUsername(String username);




}
