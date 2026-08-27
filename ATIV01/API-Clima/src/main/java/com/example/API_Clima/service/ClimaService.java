package com.example.API_Clima.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ClimaService {
    private static final String API_URL = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m";

    private String consultarURL(String apiUrl){
        String dados = "";

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(apiUrl, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            dados = response.getBody();
        } else {
            System.out.println("Erro ao consultar a API: " + response.getStatusCode());
        }

        return dados;
    }

    public String preverClimaBH() {
        return consultarURL(API_URL + "/climaBH");
    }

    public String preverClimaCidade(String cidade) {
        return consultarURL(API_URL + "/clima/" + cidade);
    }
}
