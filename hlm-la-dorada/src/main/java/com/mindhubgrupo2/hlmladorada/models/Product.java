package com.mindhubgrupo2.hlmladorada.models;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productID;

    private int stock;

    private double cost, finalPrice;

    private double revenue;

    private String name,details, brand, category, image;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "PurchaseProduct")
    private Purchase purchaseHolder;

    private Integer promos;

    @OneToMany(mappedBy = "productHolder")
    private Set<CartDetails> cartDetails = new HashSet<>();

    public Product() {
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Product(String name, int stock, double cost, double finalPrice, double revenue, String details, String brand, String category, Integer promos, String image) {
        this.name = name;
        this.stock = stock;
        this.cost = cost;
        this.finalPrice = finalPrice;
        this.revenue = revenue;
        this.details = details;
        this.brand = brand;
        this.category = category;
        this.promos = promos;
        this.image = image;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getProductID() {
        return productID;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }

    public double getFinalPrice() {
        return finalPrice;
    }

    public void setFinalPrice(double finalPrice) {
        this.finalPrice = finalPrice;
    }

    public double getRevenue() {
        return revenue;
    }

    public void setRevenue(double revenue) {
        this.revenue = revenue;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getPromos() {
        return promos;
    }

    public void setPromos(Integer promos) {
        this.promos = promos;
    }

/*    public void addPromo(Promo promo){
        promo.setProduct(this);
        promos.add(promo);
    }*/

    public Set<CartDetails> getCartDetails() {
        return cartDetails;
    }

    public void setCartDetails(Set<CartDetails> cartDetails) {
        this.cartDetails = cartDetails;
    }

    public Purchase getPurchaseHolder() {
        return purchaseHolder;
    }

    public void setPurchaseHolder(Purchase purchaseHolder) {
        this.purchaseHolder = purchaseHolder;
    }

    public void addPurchase(Purchase purchase) {
        purchase.setProductHolder(this);
        this.setPurchaseHolder(purchase);
    }

    public void addCartDetail(CartDetails cartDetail){
        cartDetail.setProductHolder(this);
        cartDetails.add(cartDetail);
    }

    @Override
    public String toString() {
        return "Product{" +
                "productID=" + productID +
                ", stock=" + stock +
                ", cost=" + cost +
                ", finalPrice=" + finalPrice +
                ", revenue=" + revenue +
                ", details='" + details + '\'' +
                ", brand='" + brand + '\'' +
                ", category='" + category + '\'' +
                ", promos=" + promos +
                ", purchaseHolder=" + purchaseHolder +
                ", cartsDetailsHolder=" +  cartDetails +
                '}';
    }
}