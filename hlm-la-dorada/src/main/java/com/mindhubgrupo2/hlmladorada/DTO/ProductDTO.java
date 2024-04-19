package com.mindhubgrupo2.hlmladorada.DTO;

import com.mindhubgrupo2.hlmladorada.models.Product;
import com.mindhubgrupo2.hlmladorada.models.Provider;

import javax.management.monitor.StringMonitor;
import java.util.List;
import java.util.Set;

public class ProductDTO {

    private Long productoDTOID;

    private double finalPrice;

    private Integer promos;

    private String  name,details, brand, category, image;

    private String provider;



    private int stock;
    public ProductDTO() {}

    public ProductDTO(Product product){
        this.productoDTOID = product.getProductID();
        this.finalPrice = product.getFinalPrice();
        this.promos = product.getPromos();
        this.name = product.getName();
        this.details = product.getDetails();
        this.brand = product.getBrand();
        this.category = product.getCategory();
        this.image = product.getImage();
        this.stock =product.getStock();
        this.provider = "Proveedor momentaneo";
    }
    public String getProvider() {
        return provider;
    }
    public int getStock() {
        return stock;
    }

    public String getImage() {
        return image;
    }

    public Long getProductoDTOID() {
        return productoDTOID;
    }

    public double getFinalPrice() {
        return finalPrice;
    }

    public Integer getPromos() {
        return promos;
    }

    public String getName() {
        return name;
    }

    public String getDetails() {
        return details;
    }

    public String getBrand() {
        return brand;
    }

    public String getCategory() {
        return category;
    }
}
