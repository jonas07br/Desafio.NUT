package dev.jonas.DesafioNut.Controller;

import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping("/login")
    public Section login(@RequestBody User user){
        return loginService.createToken(user);
    }

    @GetMapping("/teste")
    public User teste(){
        User teste = new User();
        teste.setLogin("TESTE");
        teste.setPassword("TESTE");
        return teste;
    }
}
