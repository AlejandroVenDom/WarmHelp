package com.warmhelp.app.repositories;

import com.warmhelp.app.models.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByCart_Id(Long id);
    List<CartItem> findByProfessionalServices_Id(Long id);
}
