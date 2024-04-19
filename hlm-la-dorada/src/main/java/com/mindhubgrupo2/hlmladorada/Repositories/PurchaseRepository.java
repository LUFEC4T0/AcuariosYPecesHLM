package com.mindhubgrupo2.hlmladorada.Repositories;

import com.mindhubgrupo2.hlmladorada.models.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PurchaseRepository extends JpaRepository<Purchase, Long> {

    List<Purchase> findByDate(LocalDate purchaseDate);

}
