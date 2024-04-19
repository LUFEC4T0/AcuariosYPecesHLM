package com.mindhubgrupo2.hlmladorada.DTO;

import com.mindhubgrupo2.hlmladorada.models.ClientDoubuts;
import com.mindhubgrupo2.hlmladorada.models.ClientStore;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

import java.time.LocalDateTime;

public class ClientDoubutsDTO {

    private Long clientDoboutsID;

    private Double amount;

    private String date;

    private String details;

    private Long clientStoreHolder;

    public ClientDoubutsDTO(ClientDoubuts clientDoubuts) {
        this.clientDoboutsID = clientDoubuts.getClientDoboutsID();
        this.amount = clientDoubuts.getAmount();
        this.date = clientDoubuts.getDate();
        this.details = clientDoubuts.getDetails();
        this.clientStoreHolder = clientDoubuts.getClientStoreHolder().getClientStoreID();
    }

    public Long getClientDoboutsID() {
        return clientDoboutsID;
    }

    public Double getAmount() {
        return amount;
    }

    public String getDate() {
        return date;
    }

    public String getDetails() {
        return details;
    }

    public Long getClientStoreHolder() {
        return clientStoreHolder;
    }
}
