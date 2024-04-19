package com.mindhubgrupo2.hlmladorada.DTO;

import com.mindhubgrupo2.hlmladorada.models.Provider;

public class ProviderDTO {

    public Long providerID;

    public String name, phone, email, ruc, adress;


    public ProviderDTO(Provider provider){
        this.providerID = provider.getProviderID();
        this.name = provider.getName();
        this.phone = provider.getPhone();
        this.email = provider.getEmail();
        this.ruc = provider.getRuc();
        this.adress = provider.getAdress();
    }

    public Long getProviderID() {
        return providerID;
    }

    public String getName() {
        return name;
    }

    public String getPhone() {
        return phone;
    }

    public String getEmail() {
        return email;
    }

    public String getRuc() {
        return ruc;
    }

    public String getAdress() {
        return adress;
    }
}
