package com.mindhubgrupo2.hlmladorada.models;

import jakarta.persistence.*;

@Entity
public class Provider {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long providerID;

    private String name;

    private String phone;

    private String email;

    private String ruc;

    private String adress;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "PurchaseProvider")
    private Purchase purchaseHolder;

    public Provider() {
    }

    public Provider(String name, String phone, String email, String ruc, String adress) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.ruc = ruc;
        this.adress = adress;
    }

    public Long getProviderID() {
        return providerID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRuc() {
        return ruc;
    }

    public void setRuc(String ruc) {
        this.ruc = ruc;
    }

    public String getAdress() {
        return adress;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public Purchase getPurchaseHolder() {
        return purchaseHolder;
    }

    public void setPurchaseHolder(Purchase purchaseHolder) {
        this.purchaseHolder = purchaseHolder;
    }

    public void addPurchase(Purchase purchase) {
        purchase.setProviderHolder(this);
        this.setPurchaseHolder(purchase);
    }

    @Override
    public String toString() {
        return "Provider{" +
                "providerID=" + providerID +
                ", name='" + name + '\'' +
                ", phone='" + phone + '\'' +
                ", email='" + email + '\'' +
                ", ruc='" + ruc + '\'' +
                ", adress='" + adress + '\'' +
                ", purchaseHolder=" + purchaseHolder +
                '}';
    }
}