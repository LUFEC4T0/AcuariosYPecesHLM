package com.mindhubgrupo2.hlmladorada.Controllers;

import com.mindhubgrupo2.hlmladorada.DTO.CartDetailsDTO;
import com.mindhubgrupo2.hlmladorada.Repositories.CartDetalsRepository;
import com.mindhubgrupo2.hlmladorada.Repositories.EmployeeRepository;
import com.mindhubgrupo2.hlmladorada.Repositories.ProductRepository;
import com.mindhubgrupo2.hlmladorada.models.CartDetails;
import com.mindhubgrupo2.hlmladorada.models.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/cartDetails")
public class CartDetailController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private CartDetalsRepository cartDetalsRepository;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/")
    public ResponseEntity<?> getAllCartsDetails(){
        String userMail = SecurityContextHolder.getContext().getAuthentication().getName();
        Employee employee = employeeRepository.findByEmail(userMail);
        if (employee.getRole().toString().equals("ADMIN")) {
            List<CartDetails> cartsDetails = cartDetalsRepository.findAll();
            return new ResponseEntity<>(cartsDetails.stream().map(CartDetailsDTO::new).collect(Collectors.toList()), HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("No tienes permiso para realizar esta acción.");
    }

    //MODELO DE PRUEBA CARRITO / REEMPLAZADO EN CARTCURRENT

//    @PostMapping("/cartsDetails")
//    public ResponseEntity<?> postCartDetails(@RequestBody RecordCartDetailDTO recordCartDetailDTO) {
//        Product product = productRepository.findById(recordCartDetailDTO.productoId()).orElse(null);
//        if (product != null) {
//            CartDetails cartDetails = new CartDetails(recordCartDetailDTO.quantity(), recordCartDetailDTO.amount());
//
//        product.addCartDetail(cartDetails);
//
//        cartDetalsRepository.save(cartDetails);
//        productRepository.save(product);
//
//        return new ResponseEntity<>(cartDetails, HttpStatus.OK);
//
//        }
//        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Product not found by its ID");
//
//    }
}
