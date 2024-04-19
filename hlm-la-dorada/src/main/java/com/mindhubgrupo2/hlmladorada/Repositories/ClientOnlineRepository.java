package com.mindhubgrupo2.hlmladorada.Repositories;

import com.mindhubgrupo2.hlmladorada.models.ClientOnline;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientOnlineRepository extends JpaRepository<ClientOnline, Long> {

    Boolean existsByEmail(String email);

    ClientOnline findByEmail(String email);

}
