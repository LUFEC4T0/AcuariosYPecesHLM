package com.mindhubgrupo2.hlmladorada.DTO;

import com.mindhubgrupo2.hlmladorada.models.Product;

import java.time.LocalDateTime;

public record NewPurchaseDTO(int quantity, String details, double unitCost, Long providerID, Long productID) {
}
