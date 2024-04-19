package com.mindhubgrupo2.hlmladorada.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class ClientDoubuts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ClientDoboutsID;

    private Double amount;

    private String date;

    private String details;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="ClientStore_ID")
    private ClientStore clientStoreHolder;

    public ClientDoubuts() {
    }

    public ClientDoubuts(Double amount, String date, String details) {
        this.amount = amount;
        this.date = date;
        this.details = details;
    }

    public Long getClientDoboutsID() {
        return ClientDoboutsID;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public ClientStore getClientStoreHolder() {
        return clientStoreHolder;
    }

    public void setClientStoreHolder(ClientStore clientStore) {
        clientStoreHolder = clientStore;
    }

    @Override
    public String toString() {
        return "ClientDoubuts{" +
                "ClientDoboutsID=" + ClientDoboutsID +
                ", amount=" + amount +
                ", date=" + date +
                ", details='" + details + '\'' +
                '}';
    }
}
