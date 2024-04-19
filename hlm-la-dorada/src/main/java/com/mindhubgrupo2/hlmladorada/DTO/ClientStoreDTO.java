package com.mindhubgrupo2.hlmladorada.DTO;

import com.mindhubgrupo2.hlmladorada.models.Cart;
import com.mindhubgrupo2.hlmladorada.models.ClientDoubuts;
import com.mindhubgrupo2.hlmladorada.models.ClientStore;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class ClientStoreDTO {

    private Long ClientStoreID;

    private String name;

    private String lastName;

    private String adress;

    private String phone;

    private String rut;

    private Double balance;

    private Set<CartDTO> carts = new HashSet<>();

    public ClientStoreDTO(ClientStore clientStore) {
        this.ClientStoreID = clientStore.getClientStoreID();
        this.name = clientStore.getName();
        this.lastName = clientStore.getLastName();
        this.adress = clientStore.getAdress();
        this.phone = clientStore.getPhone();
        this.rut = clientStore.getRut();
        this.balance = clientStore.getBalance();
        this.carts = clientStore.getCarts().stream().map(CartDTO::new).collect(Collectors.toSet());
    }

    public Long getClientStoreID() {
        return ClientStoreID;
    }

    public String getName() {
        return name;
    }

    public String getLastName() {
        return lastName;
    }

    public String getAdress() {
        return adress;
    }

    public String getPhone() {
        return phone;
    }

    public String getRut() {
        return rut;
    }

    public Double getBalance() {
        return balance;
    }

    public Set<CartDTO> getCarts() {
        return carts;
    }
}
