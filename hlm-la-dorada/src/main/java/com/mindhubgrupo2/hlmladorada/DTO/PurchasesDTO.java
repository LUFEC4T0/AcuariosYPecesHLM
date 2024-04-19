package com.mindhubgrupo2.hlmladorada.DTO;

import com.mindhubgrupo2.hlmladorada.models.Purchase;

import java.time.LocalDateTime;

public class PurchasesDTO {

    public Long purchaseID;

    public String details;

    public LocalDateTime date;

    public double unitCost, totalCost;

    public PurchasesDTO(Purchase purchase) {
        this.purchaseID = purchase.getPurchaseID();
        this.details = purchase.getDetails();
        this.date = purchase.getDate();
        this.unitCost = purchase.getUnitCost();
        this.totalCost = purchase.getTotalCost();
    }

    public Long getPurchaseID() {
        return purchaseID;
    }

    public String getDetails() {
        return details;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public double getUnitCost() {
        return unitCost;
    }

    public double getTotalCost() {
        return totalCost;
    }
}
