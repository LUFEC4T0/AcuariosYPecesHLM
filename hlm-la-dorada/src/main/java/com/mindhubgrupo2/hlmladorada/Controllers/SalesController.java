package com.mindhubgrupo2.hlmladorada.Controllers;

import com.mindhubgrupo2.hlmladorada.DTO.RecordSaleDTO;
import com.mindhubgrupo2.hlmladorada.DTO.SalesDTO;
import com.mindhubgrupo2.hlmladorada.Repositories.CartRepository;
import com.mindhubgrupo2.hlmladorada.Repositories.EmployeeRepository;
import com.mindhubgrupo2.hlmladorada.Repositories.ProductRepository;
import com.mindhubgrupo2.hlmladorada.Repositories.SalesRepository;
import com.mindhubgrupo2.hlmladorada.models.Cart;
import com.mindhubgrupo2.hlmladorada.models.Employee;
import com.mindhubgrupo2.hlmladorada.models.Sales;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/sales")
public class SalesController {


    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private SalesRepository salesRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping("/all")
    public ResponseEntity<?> getSales(){
        List<Sales> allSales = (List<Sales>) salesRepository.findAll();
        if(allSales.size() == 0){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Aún no se han realizado ventas.");
        }
        return new ResponseEntity<>(allSales.stream().map(SalesDTO::new).collect(Collectors.toList()), HttpStatus.OK);
    }

//    String details, Double finalAmount, String paidMethod, String taxes, Long employeeId, Long cartId
    @PostMapping("/")
    public ResponseEntity<?> postNewSale(@RequestBody RecordSaleDTO recordSaleDTO) {

        System.out.println(recordSaleDTO);
        Employee newEmployee = employeeRepository.findById(recordSaleDTO.employeeId()).orElse(null);
        if(newEmployee == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Empleado no encontrado.");
        }

        Cart newCart = cartRepository.findById(recordSaleDTO.cartId()).orElse(null);

        if(newCart == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Carrito no encontrado.");
        }

        Sales saleCurrent = new Sales(
                recordSaleDTO.details(),
                recordSaleDTO.finalAmount(),
                recordSaleDTO.paidMethod(),
                recordSaleDTO.taxes()
        );
        salesRepository.save(saleCurrent);

        newCart.addSale(saleCurrent);
        newEmployee.addSale(saleCurrent);

        cartRepository.save(newCart);
        employeeRepository.save(newEmployee);
        salesRepository.save(saleCurrent);

        return ResponseEntity.status(HttpStatus.OK).body("Venta creada exitosamente.");

    }

}
