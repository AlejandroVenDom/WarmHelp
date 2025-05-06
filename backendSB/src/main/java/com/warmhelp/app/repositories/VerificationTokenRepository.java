package com.warmhelp.app.repositories;

import com.warmhelp.app.models.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {

    Optional<VerificationToken> findByToken(String token);

    // También puedes agregar otros métodos si es necesario
}
