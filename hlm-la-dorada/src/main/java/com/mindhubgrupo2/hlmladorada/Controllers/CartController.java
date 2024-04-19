package com.mindhubgrupo2.hlmladorada.Controllers;

import com.mindhubgrupo2.hlmladorada.DTO.CartDTO;
import com.mindhubgrupo2.hlmladorada.DTO.RecordCartDetailDTO;
import com.mindhubgrupo2.hlmladorada.DTO.RecordCartDetailStoreDTO;
import com.mindhubgrupo2.hlmladorada.Repositories.*;
import com.mindhubgrupo2.hlmladorada.models.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/carts")
public class CartController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartDetalsRepository cartDetalsRepository;

    @Autowired
    private ClientOnlineRepository clientOnlineRepository;

    @Autowired
    private ClientStoreRepository clientStoreRepository;

    @GetMapping("/")
    public ResponseEntity<?> getAllCarts(){
        String userMail = SecurityContextHolder.getContext().getAuthentication().getName();
        Employee employee = employeeRepository.findByEmail(userMail);
        if (employee.getRole().toString().equals("ADMIN")) {
            List<Cart> carts = cartRepository.findAll();
            return new ResponseEntity<>(carts.stream().map(CartDTO::new).collect(Collectors.toList()), HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("No tienes permiso para realizar esta acción.");
    }

    @Transactional
    @PostMapping("/cartOnline")
    public ResponseEntity<?> postCartClientOnline(@RequestBody List<RecordCartDetailDTO> cartsDetails) {
        System.out.println(cartsDetails);

        Cart cartCurrent = new Cart();
        Double balance = 0.00;

        for (var i=0; i<cartsDetails.size();i++) {
            System.out.println("cart " + i + ": " + cartsDetails.get(i));

            Product product = productRepository.findById(cartsDetails.get(i).productoId()).orElse(null);
            System.out.println("producto Antes: "+ product);

            if(product != null) {

                if (cartsDetails.get(i).quantity() > product.getStock()) {
                    return new ResponseEntity<>("Insufficient " + product.getName() + " stock", HttpStatus.FORBIDDEN);
                }
                product.setStock(product.getStock() - cartsDetails.get(i).quantity());
                System.out.println("producto Después: "+ product);

                CartDetails newCartDetails = new CartDetails(cartsDetails.get(i).quantity(), cartsDetails.get(i).amount());
                cartDetalsRepository.save(newCartDetails);
                balance += (cartsDetails.get(i).quantity() * cartsDetails.get(i).amount());

                product.addCartDetail(newCartDetails);

                cartCurrent.addCartDetails(newCartDetails);

                productRepository.save(product);
                cartDetalsRepository.save(newCartDetails);
                cartRepository.save(cartCurrent);
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Producto no encontrado por su ID.");
            }

        };
        if(!cartCurrent.getCartDetails().isEmpty()) {
            String userMail = SecurityContextHolder.getContext().getAuthentication().getName();
            ClientOnline clientOnlineCurrent = clientOnlineRepository.findByEmail(userMail);

            clientOnlineCurrent.setBalance(clientOnlineCurrent.getBalance() + balance);
            clientOnlineCurrent.addCart(cartCurrent);

            clientOnlineRepository.save(clientOnlineCurrent);
            cartRepository.save(cartCurrent);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Se produjo un error al vincular la lista de pedidos al carrito.");
        }

        return new ResponseEntity<>(new CartDTO(cartCurrent), HttpStatus.OK);
    }

    @Transactional
    @PostMapping("/cartStore")
    public ResponseEntity<?> postCartClientStore(@RequestBody List<RecordCartDetailStoreDTO> cartsDetails) {
        System.out.println(cartsDetails);

        Cart cartCurrent = new Cart();
        Double balance = 0.00;

        for (var i=0; i<cartsDetails.size();i++) {
            System.out.println("cart " + i + ": " + cartsDetails.get(i));

            Product product = productRepository.findById(cartsDetails.get(i).productoId()).orElse(null);
            System.out.println("producto Antes: "+ product);

            if(product != null) {

                if (cartsDetails.get(i).quantity() > product.getStock()) {
                    return new ResponseEntity<>("Stock de " + product.getName() + " insuficiente.", HttpStatus.FORBIDDEN);
                }
                product.setStock(product.getStock() - cartsDetails.get(i).quantity());
                System.out.println("producto Después: "+ product);

                CartDetails newCartDetails = new CartDetails(cartsDetails.get(i).quantity(), cartsDetails.get(i).amount());
                cartDetalsRepository.save(newCartDetails);
                balance += (cartsDetails.get(i).quantity() * cartsDetails.get(i).amount());

                product.addCartDetail(newCartDetails);

                cartCurrent.addCartDetails(newCartDetails);

                productRepository.save(product);
                cartDetalsRepository.save(newCartDetails);
                cartRepository.save(cartCurrent);
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Producto no encontrado por su ID.");
            }

        };
        if(!cartCurrent.getCartDetails().isEmpty()) {

            ClientStore clientStoreCurrent = clientStoreRepository.findByRut(cartsDetails.get(0).rut());

            clientStoreCurrent.setBalance(clientStoreCurrent.getBalance() + balance);
            clientStoreCurrent.addCarts(cartCurrent);

            clientStoreRepository.save(clientStoreCurrent);
            cartRepository.save(cartCurrent);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Se produjo un error al vincular la lista de pedidos al carrito.");
        }

        return new ResponseEntity<>(new CartDTO(cartCurrent), HttpStatus.OK);
    }

}
