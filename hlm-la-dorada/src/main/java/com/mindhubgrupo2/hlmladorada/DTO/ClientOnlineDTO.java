package com.mindhubgrupo2.hlmladorada.DTO;

import com.mindhubgrupo2.hlmladorada.models.Cart;
import com.mindhubgrupo2.hlmladorada.models.ClientOnline;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class ClientOnlineDTO {

    private Long clientOnlineID;

    private String name;

    private String lastName;

    private String email;

    private String adress;

    private String phone;

    private Double balance;

    private Set<CartDTO> carts = new HashSet<>();

    public ClientOnlineDTO(ClientOnline clientOnline) {
        this.clientOnlineID = clientOnline.getClientOnlineID();
        this.name = clientOnline.getName();
        this.lastName = clientOnline.getLastName();
        this.email = clientOnline.getEmail();
        this.adress = clientOnline.getAdress();
        this.phone = clientOnline.getPhone();
        this.balance = clientOnline.getBalance();
        this.carts = clientOnline.getCarts().stream().map(CartDTO::new).collect(Collectors.toSet()); // Ver si es necesario CartDto, todos los datos son importantes
    }

    public Long getClientOnlineID() {
        return clientOnlineID;
    }

    public String getName() {
        return name;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getAdress() {
        return adress;
    }

    public String getPhone() {
        return phone;
    }

    public Double getBalance() {
        return balance;
    }

    public Set<CartDTO> getCarts() {
        return carts;
    }
}
