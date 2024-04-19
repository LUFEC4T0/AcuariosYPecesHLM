package com.mindhubgrupo2.hlmladorada.models;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
public class ClientStore {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ClientStoreID;

    private String name;

    private String lastName;

    private String adress;

    private String phone;

    private String role = "USER";

    private String rut;

    private Double balance = 0.00;

    @OneToOne(mappedBy = "clientStoreHolder", fetch = FetchType.EAGER)
    private ClientDoubuts doubutHolder;

    @OneToMany(mappedBy = "clientStoreHolder", fetch = FetchType.EAGER)
    private Set<Cart> carts = new HashSet<>();

    public ClientStore() {
    }

    public ClientStore(String name, String lastName, String phone, String rut, String adress) {
        this.name = name;
        this.lastName = lastName;
        this.adress = adress;
        this.phone = phone;
        this.rut = rut;
    }

    public Long getClientStoreID() {
        return ClientStoreID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getRut() {
        return rut;
    }

    public void setRut(String rut) {
        this.rut = rut;
    }

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public ClientDoubuts getDoubutHolder() {
        return doubutHolder;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setDoubutHolder(ClientDoubuts doubut) {
        this.doubutHolder = doubut;
    }

    public Set<Cart> getCarts() {
        return carts;
    }

    public void setCarts(Set<Cart> carts) {
        this.carts = carts;
    }

    public String getAdress() {
        return adress;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public void addCarts(Cart cart) {
        cart.setClientStore(this);
        carts.add(cart);
    }

    public void addClientDoubuts(ClientDoubuts clientDoubuts) {
        clientDoubuts.setClientStoreHolder(this);
        this.setDoubutHolder(clientDoubuts);
    }

    @Override
    public String toString() {
        return "ClientStore{" +
                "ClientStoreID=" + ClientStoreID +
                ", name='" + name + '\'' +
                ", lastName='" + lastName + '\'' +
                ", phone='" + phone + '\'' +
                ", rut='" + rut + '\'' +
                ", balance=" + balance +
                ", doubutHolder=" + doubutHolder +
                ", carts=" + carts +
                ", adress=" + adress +
                '}';
    }
}
