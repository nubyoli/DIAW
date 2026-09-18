package com.example.LoginPUC.controller;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.LoginPUC.config.UserConfig;
import com.example.LoginPUC.service.UserService;

@Controller
public class SecureLoginController {

    private final UserConfig userConfig;
    private final UserService userService;

    public SecureLoginController(UserConfig userConfig, UserService userService){
        this.userConfig = userConfig;
        this.userService = userService;
    }

    @GetMapping("/home")
    public String home(Authentication authentication, Model model){
        String email = authentication.getName();
        String nome = userService.getName(email);
        System.out.println("Usuário logado: " + email);
        model.addAttribute("nome", nome != null ? nome : email);
        return "home";
    }

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

        if (userService.existis(email)) {
            System.out.println("Registro: O e-mail já está em uso.");
            return "redirect:/register";
        }

        userService.createUser(email, senha, nome);
        System.out.println("Usuário cadastrado: " + email);
        System.out.println("Nome cadastrado: " + nome);

        return "redirect:/login?cadastro=sucesso"; 
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
