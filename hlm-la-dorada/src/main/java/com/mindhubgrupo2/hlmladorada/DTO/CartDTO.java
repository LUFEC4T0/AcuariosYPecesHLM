package com.mindhubgrupo2.hlmladorada.DTO;

import com.mindhubgrupo2.hlmladorada.models.*;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class CartDTO {

    private Long cartID;
    private Set<CartDetailsDTO> cartDetails = new HashSet<>();

//    private Long clientStoreHolder;
//
//    private Long clientOnlineHolder;
//
//    private Long salesHolder;

    public CartDTO(Cart cart) {
        this.cartID = cart.getCartID();
        this.cartDetails = cart.getCartDetails().stream().map(CartDetailsDTO::new).collect(Collectors.toSet());
//        if(cart.getClientOnlineHolder().) {
//            this.clientOnlineHolder = cart.getClientOnlineHolder().getClientOnlineID();
//        }
//        if(cart.getClientStoreHolder().equals(null)) {
//            this.clientStoreHolder = cart.getClientStoreHolder().getClientStoreID();
//
//        }
//        if(cart.getSalesHolder().equals(null)){
//            this.salesHolder = cart.getSalesHolder().getSalesID();
//        }
    }

    public Long getCartID() {
        return cartID;
    }

    public Set<CartDetailsDTO> getCartDetails() {
        return cartDetails;
    }

//    public Long getClientStoreHolder() {
//        return clientStoreHolder;
//    }
//
//    public Long getClientOnlineHolder() {
//        return clientOnlineHolder;
//    }
//
//    public Long getSalesHolder() {
//        return salesHolder;
//    }
}
