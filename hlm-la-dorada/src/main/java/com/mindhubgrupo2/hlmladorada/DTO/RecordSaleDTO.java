package com.mindhubgrupo2.hlmladorada.DTO;

import com.mindhubgrupo2.hlmladorada.models.Cart;
import com.mindhubgrupo2.hlmladorada.models.Employee;
import com.mindhubgrupo2.hlmladorada.models.PaidMethod;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

import java.util.List;

public record RecordSaleDTO(String details, Double finalAmount, List<PaidMethod> paidMethod, List<Double> taxes, Long employeeId, Long cartId) {}
