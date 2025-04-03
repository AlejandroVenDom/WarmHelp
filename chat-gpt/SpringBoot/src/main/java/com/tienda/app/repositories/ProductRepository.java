package com.tienda.app.repositories;

import com.tienda.app.enums.Currency;
import com.tienda.app.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findBySellerUsername(String username);
    List<Product> findByNameContainingIgnoreCase(String name);
    List<Product> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);
    List<Product> findTop10ByOrderByCreatedAtDesc();
    List<Product> findByCurrency(Currency currency);
}
