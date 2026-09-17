package com.example.LoginPUC.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class SecureLoginController {
    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/register")
    public String register() {
        return "register";
    }

    @PostMapping("/register")
    public String handleRegister(
            @RequestParam("nome") String nome,
            @RequestParam("email") String email,
            @RequestParam("senha") String senha,
            @RequestParam("confirmaSenha") String confirmaSenha) {

        if (!senha.equals(confirmaSenha)) {
            System.out.println("Registro: As senhas não coincidem.");
            return "redirect:/register";
        }

        System.out.println("Registro: Redirecionado para a página de login.");
        return "redirect:/login"; 
    }

    @GetMapping("/recoverpassword")
    public String recoverpassword() {
        return "recoverpassword";
    }

    @PostMapping("/recoverpassword")
    public String handleRecoverPassword(
            @RequestParam("email") String email) {

        System.out.println("Recuperação de E-mail: Redirecionado para a página de login.");
        return "redirect:/login"; 
    }
}
