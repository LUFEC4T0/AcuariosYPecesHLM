package com.mindhubgrupo2.hlmladorada.Controllers;

import com.mindhubgrupo2.hlmladorada.DTO.ProviderDTO;
import com.mindhubgrupo2.hlmladorada.DTO.ProviderRegisterDTO;
import com.mindhubgrupo2.hlmladorada.Repositories.ProviderRepository;
import com.mindhubgrupo2.hlmladorada.models.Provider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/provider")
public class ProviderController {

    @Autowired
    ProviderRepository providerRepository;

    @GetMapping("/all")
    public ResponseEntity<?> getListOfProvider(){
        List<Provider> providers = (List<Provider>) providerRepository.findAll();

        if (providers.size() == 0){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Aún no se han agregado proveedores al sistema.");
        }

        return new ResponseEntity<>(providers.stream().map(ProviderDTO::new).collect(Collectors.toList()), HttpStatus.OK);

    }


    @PostMapping("/register")
    public ResponseEntity<?> registerProvider(@RequestBody ProviderRegisterDTO providerDTO){
        try {
            String user = SecurityContextHolder.getContext().getAuthentication().getName();

            if(providerDTO.name().isBlank()){
                return new ResponseEntity<>("Lo siento, debes completar la entrada del nombre.", HttpStatus.BAD_REQUEST);
            }
            if(providerDTO.email().isBlank()){
                return new ResponseEntity<>("Lo sentimos, necesitas completar la entrada de correo electrónico.", HttpStatus.BAD_REQUEST);
            }
            if(providerDTO.RUC().isBlank()){
                return new ResponseEntity<>("Lo siento, necesitas llenar el ingreso del RUC", HttpStatus.BAD_REQUEST);
            }
            if(providerDTO.phone().isBlank()){
                return new ResponseEntity<>("Lo siento, necesitas completar la entrada del teléfono.", HttpStatus.BAD_REQUEST);
            }
            if(providerDTO.adress().isBlank()){
                return new ResponseEntity<>("Lo siento, debes completar la entrada de dirección.", HttpStatus.BAD_REQUEST);
            }

            Provider newProvider = new Provider(providerDTO.name(), providerDTO.phone(),providerDTO.email(),providerDTO.RUC(),providerDTO.adress());

            providerRepository.save(newProvider);

            return new ResponseEntity<>(providerDTO.name()+" fue agregado a su lista de proveedores",HttpStatus.CREATED);


        }
        catch (Exception e) {
            return new ResponseEntity<>("Algo salió mal: " + e, HttpStatus.BAD_REQUEST);
        }

    }




}
