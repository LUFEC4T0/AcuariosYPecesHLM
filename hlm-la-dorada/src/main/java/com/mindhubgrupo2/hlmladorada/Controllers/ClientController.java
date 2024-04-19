package com.mindhubgrupo2.hlmladorada.Controllers;

import com.mindhubgrupo2.hlmladorada.DTO.ClientOnlineDTO;
import com.mindhubgrupo2.hlmladorada.DTO.ClientStoreDTO;
import com.mindhubgrupo2.hlmladorada.Repositories.ClientOnlineRepository;
import com.mindhubgrupo2.hlmladorada.Repositories.ClientStoreRepository;
import com.mindhubgrupo2.hlmladorada.Repositories.EmployeeRepository;
import com.mindhubgrupo2.hlmladorada.models.ClientOnline;
import com.mindhubgrupo2.hlmladorada.models.ClientStore;
import com.mindhubgrupo2.hlmladorada.models.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/clients")
public class ClientController {

    @Autowired
    private ClientOnlineRepository clientOnlineRepository;

    @Autowired
    private ClientStoreRepository clientStoreRepository;

    @Autowired
    private EmployeeRepository employeeRepository;



    @GetMapping("/clientOnline")
    public ResponseEntity<?> getAllClientsOnline(){
        String userMail = SecurityContextHolder.getContext().getAuthentication().getName();
        Employee employee = employeeRepository.findByEmail(userMail);
        if (employee.getRole().toString().equals("ADMIN")) {
            List<ClientOnline> clientsOnline = clientOnlineRepository.findAll();
            return new ResponseEntity<>(clientsOnline.stream().map(ClientOnlineDTO::new).collect(Collectors.toList()), HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("No tienes permiso para realizar esta acción.");
    }

    @GetMapping("/clientStore")
    public ResponseEntity<?> getAllClientsStore(){
        String userMail = SecurityContextHolder.getContext().getAuthentication().getName();
        Employee employee = employeeRepository.findByEmail(userMail);
        if (employee.getRole().toString().equals("ADMIN")) {
            List<ClientStore> clientsStore = clientStoreRepository.findAll();
            return new ResponseEntity<>(clientsStore.stream().map(ClientStoreDTO::new).collect(Collectors.toList()), HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("No tienes permiso para realizar esta acción");
    }

    @GetMapping("/clientOnline/{id}")
    public ResponseEntity<?> getClientOnlineById(@PathVariable Long id){
        String userMail = SecurityContextHolder.getContext().getAuthentication().getName();
        Employee employee = employeeRepository.findByEmail(userMail);
        if (employee.getRole().toString().equals("ADMIN")) {
            ClientOnline client = clientOnlineRepository.findById(id).orElse(null);
            if(client == null) {
                return new ResponseEntity<>("El usuario con el id: " + id + " no se encuentra en la base de datos.",
                        HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(new ClientOnlineDTO(client), HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("No tienes permiso para realizar esta acción.");
    }

    @GetMapping("/clientStore/{id}")
    public ResponseEntity<?> getClientStoreById(@PathVariable Long id){
        String userMail = SecurityContextHolder.getContext().getAuthentication().getName();
        Employee employee = employeeRepository.findByEmail(userMail);
        if (employee.getRole().toString().equals("ADMIN")) {
            ClientStore client = clientStoreRepository.findById(id).orElse(null);
            if(client == null) {
                return new ResponseEntity<>("El usuario con el id: " + id + " no se encuentra en la base de datos.",
                        HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(new ClientStoreDTO(client), HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("No tienes permiso para realizar esta acción.");
    }

}