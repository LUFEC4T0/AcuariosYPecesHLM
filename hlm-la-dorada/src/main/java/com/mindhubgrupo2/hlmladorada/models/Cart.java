package com.mindhubgrupo2.hlmladorada.models;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartID;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "clientStCart")
    private ClientStore clientStoreHolder;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "clientOnCart")
    private ClientOnline clientOnlineHolder;

    @OneToMany(mappedBy="cartHolder", fetch = FetchType.EAGER)
    private Set<CartDetails> cartDetails = new HashSet<>();

    @OneToOne(mappedBy = "cartHolder")
    private Sales salesHolder;

    public void addCartDetails(CartDetails cartDetail){
        cartDetail.setCartHolder(this);
        cartDetails.add(cartDetail);
    }

    public void addSale(Sales sale){
        sale.setCartHolder(this);
        this.setSalesHolder(sale);
    }

    public Cart() {
    }

    public Long getCartID() {
        return cartID;
    }

    public ClientStore getClientStoreHolder() {
        return clientStoreHolder;
    }

    public void setClientStore(ClientStore clientStore) {
        this.clientStoreHolder = clientStore;
    }

    public ClientOnline getClientOnlineHolder() {
        return clientOnlineHolder;
    }

    public void setClientOnlineHolder(ClientOnline clientOnline) {
        this.clientOnlineHolder = clientOnline;
    }

    public Set<CartDetails> getCartDetails() {
        return cartDetails;
    }

    public void setCartDetails(Set<CartDetails> cartDetails) {
        this.cartDetails = cartDetails;
    }

    public void setClientStoreHolder(ClientStore clientStoreHolder) {
        this.clientStoreHolder = clientStoreHolder;
    }

    public Sales getSalesHolder() {
        return salesHolder;
    }

    public void setSalesHolder(Sales salesHolder) {
        this.salesHolder = salesHolder;
    }

    @Override
    public String toString() {
        return "Cart{" +
                "cartID=" + cartID +
                ", cartDetails=" + cartDetails +
                '}';
    }
}
