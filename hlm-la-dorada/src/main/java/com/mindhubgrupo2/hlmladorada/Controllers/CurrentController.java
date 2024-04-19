package com.mindhubgrupo2.hlmladorada.Controllers;

import com.mindhubgrupo2.hlmladorada.DTO.CartDTO;
import com.mindhubgrupo2.hlmladorada.DTO.ClientOnlineDTO;
import com.mindhubgrupo2.hlmladorada.DTO.EditClientDTO;
import com.mindhubgrupo2.hlmladorada.Repositories.ClientOnlineRepository;
import com.mindhubgrupo2.hlmladorada.models.ClientOnline;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/current")
public class CurrentController {

    @Autowired
    private ClientOnlineRepository clientOnlineRepository;

    @GetMapping("/")
    public ResponseEntity<?> getCurrentClient() {
        String userMail = SecurityContextHolder.getContext().getAuthentication().getName();
        ClientOnline clientOnline = clientOnlineRepository.findByEmail(userMail);

        return new ResponseEntity<>(new ClientOnlineDTO(clientOnline), HttpStatus.OK);
    }

    @GetMapping("/carts")
    public ResponseEntity<?> getCurrentCart() {
        String userMail = SecurityContextHolder.getContext().getAuthentication().getName();
        ClientOnline clientOnline = clientOnlineRepository.findByEmail(userMail);

        return new ResponseEntity<>(clientOnline.getCarts().stream().map(CartDTO::new).collect(Collectors.toSet()), HttpStatus.OK);
    }

    @PostMapping("/editData")
    public ResponseEntity<?> postEditData(@RequestBody EditClientDTO editClientDTO) {
        String userMail = SecurityContextHolder.getContext().getAuthentication().getName();
        ClientOnline clientOnline = clientOnlineRepository.findByEmail(userMail);
        try {
            clientOnline.setName(editClientDTO.name());
            clientOnline.setLastName(editClientDTO.lastName());
            clientOnline.setEmail(editClientDTO.email());
            clientOnline.setAdress(editClientDTO.adress());
            clientOnline.setPhone(editClientDTO.phone());
            clientOnline.setPassword(editClientDTO.password());

            clientOnlineRepository.save(clientOnline);

            return new ResponseEntity<>(new ClientOnlineDTO(clientOnline), HttpStatus.OK);

        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Se produjo un error en el servidor.");

        }
    }
}
