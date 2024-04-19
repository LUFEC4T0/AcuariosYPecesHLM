package com.mindhubgrupo2.hlmladorada.Repositories;

import com.mindhubgrupo2.hlmladorada.models.ClientStore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientStoreRepository extends JpaRepository<ClientStore, Long> {
    Boolean existsByRut(String rut);
   //Boolean existsByEmail(String email);

    ClientStore findByRut(String rut);
}
