package com.warmhelp.app.repositories;

import com.warmhelp.app.enums.CurrencyType;
import com.warmhelp.app.models.Currency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CurrencyRepository extends JpaRepository<Currency, Long> {
    Optional<Currency> findByCurrencyType(CurrencyType currencyType);
}
