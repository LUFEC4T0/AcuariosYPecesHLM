package com.mindhubgrupo2.hlmladorada.DTO;

import com.mindhubgrupo2.hlmladorada.models.Cart;
import com.mindhubgrupo2.hlmladorada.models.Employee;
import com.mindhubgrupo2.hlmladorada.models.PaidMethod;
import com.mindhubgrupo2.hlmladorada.models.Sales;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

import java.util.ArrayList;
import java.util.List;

public class SalesDTO {

    private Long id;

    private double finalAmount;

    private List<PaidMethod> paidMethod;

    private List<Double> taxes;

    private Long employeeHolder;

    private Long cartHolder;

    public SalesDTO(Sales sale) {
        this.id = sale.getSalesID();
        this.finalAmount = sale.getFinalAmount();
        this.paidMethod = sale.getPaidMethod();
        this.taxes = sale.getTaxes();
        this.cartHolder = sale.getCartHolder().getCartID();
        this.employeeHolder = sale.getEmployeeHolder().getEmployeeID();
    }

    public Long getId() {
        return id;
    }

    public double getFinalAmount() {
        return finalAmount;
    }

    public List<PaidMethod> getPaidMethod() {
        return paidMethod;
    }

    public List<Double> getTaxes() {
        return taxes;
    }

    public Long getEmployeeHolder() {
        return employeeHolder;
    }

    public Long getCartHolder() {
        return cartHolder;
    }
}
