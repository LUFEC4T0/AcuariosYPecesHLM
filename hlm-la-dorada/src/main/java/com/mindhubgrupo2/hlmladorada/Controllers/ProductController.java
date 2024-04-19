package com.mindhubgrupo2.hlmladorada.Controllers;


import com.mindhubgrupo2.hlmladorada.DTO.ChangeQuantityDTO;
import com.mindhubgrupo2.hlmladorada.DTO.ProductDTO;
import com.mindhubgrupo2.hlmladorada.DTO.RegisterProductDTO;
import com.mindhubgrupo2.hlmladorada.Repositories.ProductRepository;
import com.mindhubgrupo2.hlmladorada.models.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
public class ProductController {


    @Autowired
    ProductRepository productRepository;

    @GetMapping("/all")
    public ResponseEntity<?> getAllProducts() {
        List<Product> products = (List<Product>) productRepository.findAll();

        if (products.size() == 0) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Lo sentimos, aún no hay productos en nuestra tienda.");
        }
        return new ResponseEntity<>(products.stream().map(ProductDTO::new).collect(Collectors.toList()), HttpStatus.OK);

    }

    @GetMapping("/{id}")
    public ResponseEntity<?> productByID(@PathVariable Long id){
        Product product = productRepository.findById(id).orElse(null);

        if(product == null){
            return  new ResponseEntity<>("Ningún producto coincide con la identificación: " +id, HttpStatus.NOT_FOUND);
        }

        ProductDTO productDTO = new ProductDTO(product);

        return new ResponseEntity<>(productDTO, HttpStatus.OK);
    }

    @PostMapping("/newProduct")
    public ResponseEntity<?> addNewProducto(@RequestBody RegisterProductDTO registerProductDTO) {
        try {
            if (registerProductDTO.name().isBlank()) {
                return new ResponseEntity<>("Por favor, completa el nombre.", HttpStatus.BAD_REQUEST);
            }
            if (registerProductDTO.brand().isBlank()) {
                return new ResponseEntity<>("Por favor, completa la marca.", HttpStatus.BAD_REQUEST);
            }
            if (registerProductDTO.details().isBlank()) {
                return new ResponseEntity<>("Por favor, agregue algunos detalles sobre el producto.", HttpStatus.BAD_REQUEST);
            }
            if (registerProductDTO.revenue() < 20) {
                return new ResponseEntity<>("Introduzca un valor de 20 o superior", HttpStatus.BAD_REQUEST);
            }
            if (registerProductDTO.category().isBlank()) {
                return new ResponseEntity<>("Por favor, completa la categoría.", HttpStatus.BAD_REQUEST);
            }

            Product newProduct = new Product(registerProductDTO.name(), 0, 0, 0, registerProductDTO.revenue(), registerProductDTO.details(), registerProductDTO.brand(), registerProductDTO.category(), 0, registerProductDTO.imageURL());
            productRepository.save(newProduct);

            return new ResponseEntity<>("Felicitaciones, nuevo producto agregado al inventario:" + registerProductDTO.name(), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Perdón, algo salió mal: " + e, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/changeQuantity")
    public ResponseEntity<?> changeProductQuantity(@RequestBody ChangeQuantityDTO changeQuantityDTO){
        try {
            Product productChange = productRepository.findById(changeQuantityDTO.productID()).orElse(null);

            if (productChange == null){
                return new ResponseEntity<>("Producto incorrecto, intente nuevamente",HttpStatus.BAD_REQUEST);
            }

            if (changeQuantityDTO.quantity() < 0){
                productChange.setStock(productChange.getStock() - changeQuantityDTO.quantity());
            } else {
                productChange.setStock(productChange.getStock() + changeQuantityDTO.quantity());
            }
            productRepository.save(productChange);

            return new ResponseEntity<>("Stock modificado en el producto: "+productChange.getName(),HttpStatus.CREATED);
        }
        catch (Exception e) {
            return new ResponseEntity<>("Lo sentimos, algo salio mal: "+e, HttpStatus.BAD_REQUEST);
        }
    }
}


