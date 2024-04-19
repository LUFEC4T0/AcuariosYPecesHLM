package com.mindhubgrupo2.hlmladorada.securityServices;

import com.mindhubgrupo2.hlmladorada.Repositories.ClientOnlineRepository;
import com.mindhubgrupo2.hlmladorada.Repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private ClientOnlineRepository clientOnlineRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var clientOnline = clientOnlineRepository.findByEmail(username);
        var employee = employeeRepository.findByEmail(username);

        if(clientOnline == null && employee == null) {
            throw new UsernameNotFoundException(username);
        }

        if(clientOnline != null) {
            return User
                    .withUsername(username)
                    .password(clientOnline.getPassword())
                    .roles(clientOnline.getRole())
                    .build();
        }

        return User
                .withUsername(username)
                .password(employee.getPassword())
                .roles(employee.getRole().toString())
                .build();

    }
}
