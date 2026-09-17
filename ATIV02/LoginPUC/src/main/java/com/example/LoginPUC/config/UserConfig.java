package com.example.LoginPUC.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration 
public class UserConfig {
    @Value("${app.user.username}")
    private String username;

    @Value("${app.user.password}")
    private String password;

    @Value("${app.user.name}")
    private String name;

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getName() {
        return name;
    }
}
