package com.mindhubgrupo2.hlmladorada.Repositories;

import com.mindhubgrupo2.hlmladorada.models.CartDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartDetalsRepository extends JpaRepository<CartDetails, Long> {
}
