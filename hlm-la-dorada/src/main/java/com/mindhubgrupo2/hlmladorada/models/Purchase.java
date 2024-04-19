package com.mindhubgrupo2.hlmladorada.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Purchase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long purchaseID;

    private int quantity;

    private String details;

    private LocalDateTime date;

    private Double unitCost;

    private Double totalCost;

    @OneToOne(mappedBy = "purchaseHolder")
    private Product productHolder;

    @OneToOne(mappedBy = "purchaseHolder")
    private Provider providerHolder;

    public Purchase() {
    }

    public Purchase(int quantity, String details, LocalDateTime date, Double unitCost, Double totalCost) {
        this.quantity = quantity;
        this.details = details;
        this.date = date;
        this.unitCost = unitCost;
        this.totalCost = totalCost;
    }

    public Long getPurchaseID() {
        return purchaseID;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public Double getUnitCost() {
        return unitCost;
    }

    public void setUnitCost(Double unitCost) {
        this.unitCost = unitCost;
    }

    public Double getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(Double totalCost) {
        this.totalCost = totalCost;
    }

    public Product getProductHolder() {
        return productHolder;
    }

    public void setProductHolder(Product productHolder) {
        this.productHolder = productHolder;
    }

    public Provider getProviderHolder() {
        return providerHolder;
    }

    public void setProviderHolder(Provider providerHolder) {
        this.providerHolder = providerHolder;
    }

    @Override
    public String toString() {
        return "Purchase{" +
                "purchaseID=" + purchaseID +
                ", quantity=" + quantity +
                ", details='" + details + '\'' +
                ", date=" + date +
                ", unitCost=" + unitCost +
                ", totalCost=" + totalCost +
                '}';
    }
}