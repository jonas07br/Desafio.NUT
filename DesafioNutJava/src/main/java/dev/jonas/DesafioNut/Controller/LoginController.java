package dev.jonas.DesafioNut.Controller;

import java.security.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import dev.jonas.DesafioNut.Model.Section;
import dev.jonas.DesafioNut.Model.User;
import dev.jonas.DesafioNut.Service.LoginService;

@RestController
public class LoginController {

    @Autowired
    private LoginService loginService;

    // @PostMapping("/login")
    // public Section login(@RequestBody User user){
    //     return loginService.createToken(user);
    // }

    @GetMapping("/login")
    public Section login(){
        String[] roles = SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getAuthorities()
            .stream().map(authority -> 
                authority.getAuthority().replace("ROLE_", "")).toArray(String[]::new);
        
        String login = SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getName();
        return loginService.generateToken(login, roles);
    }

    @GetMapping("/teste")
    public String teste(){
        return "AREA MANAGER";
    }
}
