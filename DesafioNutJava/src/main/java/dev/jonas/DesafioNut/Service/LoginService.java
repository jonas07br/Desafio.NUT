package dev.jonas.DesafioNut.Service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties.Jwt;
import org.springframework.stereotype.Component;


import dev.jonas.DesafioNut.Model.Section;
import dev.jonas.DesafioNut.Model.User;
import dev.jonas.DesafioNut.Security.JWT.JWTConfig;
import dev.jonas.DesafioNut.Security.JWT.JWTCreator;
import dev.jonas.DesafioNut.Security.JWT.JWTObject;

@Component
public class LoginService {

    @Autowired
    JWTConfig jwtConfig;

    // public Section createToken(User user){
    //     if("admin".equals(user.getLogin()) || "admin".equals(user.getPassword())){
    //         Section section = new Section();
    //         section.setLogin(user.getLogin());
    
    //         JWTObject jwtObject = new JWTObject();
    //         jwtObject.setSubject(user.getLogin());  
    //         jwtObject.setIssuedAt(new Date(System.currentTimeMillis()));
    //         jwtObject.setExpiration(new Date(System.currentTimeMillis() + jwtConfig.EXPIRATION));
    //         jwtObject.setRoles("MANAGERS");
            
    //         String token = JWTCreator.create(jwtConfig.PREFIX,jwtConfig.KEY,jwtObject);
    //         section.setToken(token);
    
    //         return section;
    //     }
    //     else{
    //         Section section = new Section();
    //         section.setLogin(user.getLogin());
    
    //         JWTObject jwtObject = new JWTObject();
    //         jwtObject.setSubject(user.getLogin());  
    //         jwtObject.setIssuedAt(new Date(System.currentTimeMillis()));
    //         jwtObject.setExpiration(new Date(System.currentTimeMillis() + jwtConfig.EXPIRATION));
    //         jwtObject.setRoles("USERS");
            
    //         String token = JWTCreator.create(jwtConfig.PREFIX,jwtConfig.KEY,jwtObject);
    //         section.setToken(token);
    
    //         return section;
    //     }
    // }
    public Section generateToken(String user,String[] roles){
        Section section = new Section();
        section.setLogin(user);

        JWTObject jwtObject = new JWTObject();
        jwtObject.setSubject(user);  
        jwtObject.setIssuedAt(new Date(System.currentTimeMillis()));
        jwtObject.setExpiration(new Date(System.currentTimeMillis() + jwtConfig.EXPIRATION));
        jwtObject.setRoles(roles);
        
        String token = JWTCreator.create(jwtConfig.PREFIX,jwtConfig.KEY,jwtObject);
        section.setToken(token);

        return section;
    }

}
