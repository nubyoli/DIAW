package com.example.DIAW_Prova1.controller;

import com.example.DIAW_Prova1.model.Candidato;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import com.example.DIAW_Prova1.service.CandidatosTseService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller 
public class CandidatosTseController {

    private final CandidatosTseService candidatosTseService;

    public CandidatosTseController(CandidatosTseService candidatosTseService) {
        this.candidatosTseService = candidatosTseService;
    }

    @GetMapping("/")
    public String index(
        @RequestParam(required = false) String cargo,
        @RequestParam(required = false) String partido,
        @RequestParam(required = false) String texto,
        Model model) {

            List<Candidato> candidatos = candidatosTseService.filtrar(cargo, partido, texto);
            model.addAttribute("candidatos", candidatos);
            model.addAttribute("listaCargos", candidatosTseService.listarCargos());
            model.addAttribute("listaPartidos", candidatosTseService.listarPartidos());
            model.addAttribute("cargo", cargo);
            model.addAttribute("partido", partido);
            model.addAttribute("texto", texto);

            if (candidatos.size() >= 1){
                model.addAttribute("mensagem", "Foram encontrados " + candidatos.size() + " candidatos.");
            } else {
                model.addAttribute("mensagem", "Nenhum candidato encontrado para esses filtros");
            }
            return "index";
    }
    
}
