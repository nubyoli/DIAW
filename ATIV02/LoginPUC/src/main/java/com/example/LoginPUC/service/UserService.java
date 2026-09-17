package com.example.LoginPUC.service;

import java.util.HashMap;
import java.util.Map;

import org.apache.catalina.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.stereotype.Service;

import com.example.LoginPUC.config.UserConfig;

@Service 
public class UserService {
    private final InMemoryUserDetailsManager userDetailsManager;
    private final PasswordEncoder passwordEncoder;

    private final Map<String, String> userNames = new HashMap<>();

    public UserService(InMemoryUserDetailsManager userDetailsManager, PasswordEncoder passwordEncoder, UserConfig userConfig){
        this.userDetailsManager = userDetailsManager;
        this.passwordEncoder = passwordEncoder;

        userNames.put(userConfig.getUsername(), userConfig.getName());
    }

    public void createUser(String email, String senha, String nome){
        // UserDetails user = User.builder().username(email).password(passwordEncoder.encode(senha)).roles("USER").build();
        // userDetailsManager.createUser(user);
        // userNames.put(email, nome);
    }
}
