package com.example.API_Clima.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.API_Clima.service.ClimaService;

@RestController
public class Controller {

    ClimaService service = new ClimaService();   

    @GetMapping("/climaBH")
    public String consultarClimaBH(){
        return service.preverClimaBH();
    }

    @GetMapping("/clima/{cidade}")
    public String consultarClima(@PathVariable String cidade){
        return service.preverClimaCidade(cidade);
    }

}
