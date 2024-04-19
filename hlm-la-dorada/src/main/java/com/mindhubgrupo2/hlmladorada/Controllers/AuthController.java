package com.mindhubgrupo2.hlmladorada.Controllers;

import com.mindhubgrupo2.hlmladorada.DTO.LoginDTO;
import com.mindhubgrupo2.hlmladorada.DTO.RegisterClientStoreDTO;
import com.mindhubgrupo2.hlmladorada.DTO.RegisterDTO;
import com.mindhubgrupo2.hlmladorada.DTO.RegisterEmployeeDTO;
import com.mindhubgrupo2.hlmladorada.Repositories.ClientOnlineRepository;
import com.mindhubgrupo2.hlmladorada.Repositories.ClientStoreRepository;
import com.mindhubgrupo2.hlmladorada.Repositories.EmployeeRepository;
import com.mindhubgrupo2.hlmladorada.models.*;
import com.mindhubgrupo2.hlmladorada.securityServices.JwtUtilService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtilService jwtUtilService;

    @Autowired
    private ClientOnlineRepository clientOnlineRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ClientStoreRepository clientStoreRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login (@RequestBody LoginDTO loginDTO) {
        Employee employee = employeeRepository.findByEmail(loginDTO.email());
        ClientOnline clientOnline = clientOnlineRepository.findByEmail(loginDTO.email());


        if(loginDTO.email().isBlank()) {
            return new ResponseEntity<>("El campo de correo electrónico no debe estar vacío." , HttpStatus.FORBIDDEN);
        }
        if(loginDTO.password().isBlank()) {
            return new ResponseEntity<>("El campo de contraseña no debe estar vacío." , HttpStatus.FORBIDDEN);
        }
        if(employee == null && clientOnline == null) {
            return new ResponseEntity<>("El correo electrónico ingresado no es válido.", HttpStatus.FORBIDDEN);
        }
        if (employee != null) {
            if(!passwordEncoder.matches(loginDTO.password(), employee.getPassword())) {
                return new ResponseEntity<>("La contraseña ingresada no es válida.", HttpStatus.FORBIDDEN);
            }
        }
        if (clientOnline != null) {
            if(!passwordEncoder.matches(loginDTO.password(), clientOnline.getPassword())) {
                return new ResponseEntity<>("La contraseña ingresada no es válida", HttpStatus.FORBIDDEN);
            }
        }

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.email(), loginDTO.password()));
        final UserDetails userDetails = userDetailsService.loadUserByUsername(loginDTO.email());
        final String jwt = jwtUtilService.generateToken(userDetails);
        return ResponseEntity.ok(jwt);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDTO registerDTO) {

        if(registerDTO.firstName().isBlank()) {
            return new ResponseEntity<>("El campo de nombre no debe estar vacío." , HttpStatus.FORBIDDEN);
        }
        if(registerDTO.lastName().isBlank()) {
            return new ResponseEntity<>("El campo de apellido no debe estar vacío." , HttpStatus.FORBIDDEN);
        }
        if(registerDTO.email().isBlank()) {
            return new ResponseEntity<>("El campo de correo electrónico no debe estar vacío." , HttpStatus.FORBIDDEN);
        }
        if(registerDTO.password().isBlank()) {
            return new ResponseEntity<>("El campo de contraseña no debe estar vacío" , HttpStatus.FORBIDDEN);
        }
        if(!registerDTO.email().contains("@")) {
            return new ResponseEntity<>("El correo electrónico no tiene @" , HttpStatus.FORBIDDEN);
        }
        if(registerDTO.password().length() < 5) {
            return new ResponseEntity<>("Su contraseña debe tener al menos 5 caracteres" , HttpStatus.FORBIDDEN);
        }
        if(clientOnlineRepository.existsByEmail(registerDTO.email())) {
            return new ResponseEntity<>("El correo electrónico ya está registrado.", HttpStatus.FORBIDDEN);
        }

        ClientOnline newClient = new ClientOnline(
                registerDTO.firstName(),
                registerDTO.lastName(),
                registerDTO.email(),
                passwordEncoder.encode(registerDTO.password()),
                registerDTO.phone(),
                registerDTO.adress()
        );

        clientOnlineRepository.save(newClient);

        return ResponseEntity.status(HttpStatus.CREATED).body("Tu cuenta ha sido creada exitosamente");
    }

    @PostMapping("/register/employee")

    public ResponseEntity<?> registerEmployee(@RequestBody RegisterEmployeeDTO registerEmployeeDTO) {


        if(registerEmployeeDTO.firstName().isBlank()) {
            return new ResponseEntity<>("El campo de nombre no debe estar vacío." , HttpStatus.FORBIDDEN);
        }
        if(registerEmployeeDTO.lastName().isBlank()) {
            return new ResponseEntity<>("El campo de apellido no debe estar vacío." , HttpStatus.FORBIDDEN);
        }
        if(registerEmployeeDTO.email().isBlank()) {
            return new ResponseEntity<>("El campo de correo electrónico no debe estar vacío." , HttpStatus.FORBIDDEN);
        }
        if(registerEmployeeDTO.password().isBlank()) {
            return new ResponseEntity<>("El campo de contraseña no debe estar vacío." , HttpStatus.FORBIDDEN);
        }
        if(registerEmployeeDTO.role().isBlank()) {
            return new ResponseEntity<>("El campo de rol no debe estar vacío." , HttpStatus.FORBIDDEN);
        }
        if(registerEmployeeDTO.workPosition().isBlank()) {
            return new ResponseEntity<>("El campo de puesto no debe estar vacío." , HttpStatus.FORBIDDEN);
        }
        if(!registerEmployeeDTO.email().contains("@")) {
            return new ResponseEntity<>("El correo electrónico no tiene @" , HttpStatus.FORBIDDEN);
        }
        if(registerEmployeeDTO.password().length() < 5) {
            return new ResponseEntity<>("Su contraseña debe tener al menos 5 caracteres" , HttpStatus.FORBIDDEN);
        }
        if(employeeRepository.existsByEmail(registerEmployeeDTO.email())) {
            return new ResponseEntity<>("El correo electrónico ya está registrado.", HttpStatus.FORBIDDEN);
        }

        Employee newClient = new Employee(
                registerEmployeeDTO.firstName(),
                registerEmployeeDTO.lastName(),
                registerEmployeeDTO.email(),
                passwordEncoder.encode(registerEmployeeDTO.password()),
                Role.valueOf(registerEmployeeDTO.role()),
                WorkPosition.valueOf(registerEmployeeDTO.workPosition())
        );

        employeeRepository.save(newClient);

        return ResponseEntity.status(HttpStatus.CREATED).body("Tu cuenta ha sido creada exitosamente.");
    };
    //String name, String lastName, String phone, String rut, String adress
    @PostMapping("/register/clientStore")

    public ResponseEntity<?> registerClientStore(@RequestBody RegisterClientStoreDTO registerClientStoreDTO) {


        if (registerClientStoreDTO.name().isBlank()) {
            return new ResponseEntity<>("El campo de nombre no debe estar vacío.", HttpStatus.FORBIDDEN);
        }
        if (registerClientStoreDTO.lastName().isBlank()) {
            return new ResponseEntity<>("El campo de apellido no debe estar vacío", HttpStatus.FORBIDDEN);
        }
        if (registerClientStoreDTO.adress().isBlank()) {
            return new ResponseEntity<>("El campo de dirección no debe estar vacío.", HttpStatus.FORBIDDEN);
        }
        if (registerClientStoreDTO.rut().isBlank()) {
            return new ResponseEntity<>("El campo de rutina no debe estar vacío.", HttpStatus.FORBIDDEN);
        }
        if (registerClientStoreDTO.phone().isBlank()) {
            return new ResponseEntity<>("El campo del teléfono no debe estar vacío.", HttpStatus.FORBIDDEN);
        }
        if (clientStoreRepository.existsByRut(registerClientStoreDTO.rut())) {
            return new ResponseEntity<>("El usuario ya está registrado.", HttpStatus.FORBIDDEN);
        }

        ClientStore newClient = new ClientStore(
                registerClientStoreDTO.name(),
                registerClientStoreDTO.lastName(),
                registerClientStoreDTO.phone(),
                registerClientStoreDTO.rut(),
                registerClientStoreDTO.adress()
        );

        clientStoreRepository.save(newClient);

        return ResponseEntity.status(HttpStatus.CREATED).body("Tu cuenta ha sido creada exitosamente.");
    };
}
