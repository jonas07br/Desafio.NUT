package dev.jonas.DesafioNut.config;

import java.security.Key;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import dev.jonas.DesafioNut.Security.JWT.JWTConfig;
import dev.jonas.DesafioNut.Security.JWT.JWTFilter;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

public class JwtInterceptor implements HandshakeInterceptor {


    @Autowired
    JWTFilter jwtFilter;
    @Autowired
    JWTConfig jwtConfig;
    @Override
    public boolean beforeHandshake(
        ServerHttpRequest request,
        ServerHttpResponse response,
        WebSocketHandler wsHandler,
        Map<String, Object> attributes) throws Exception {
        
            if(request instanceof ServerHttpRequest){
                ServletServerHttpRequest serverHttpRequest = (ServletServerHttpRequest) request;
                
                
                String token = serverHttpRequest.getServletRequest().getParameter("auth-token");
                token=token.replace("BEARER", "");
                token=token.replace(" ", "");
                if(token!=null && this.validateToken(token)){
                    if(this.getRolesFromToken(token).equalsIgnoreCase("[ROLE_MANAGERS]")){
                        return true;
                    }
                    return false;
                }
                
            }   
                return false;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
            Exception exception) {
        
    }

    public Boolean validateToken(String token){
        if(token.isBlank()){
            return false;
        }
        try{
            Jwts.parser().setSigningKey(jwtConfig.KEY).parseClaimsJws(token);
            return true;
        }
        catch(Exception e){
            return false;
        }
    }

    public String getRolesFromToken(String token) {
        try{
            Claims claims =Jwts.parser().setSigningKey(jwtConfig.KEY).parseClaimsJws(token).getBody();
            String role =claims.get("authorities").toString();
            return role;
        }
        catch(Exception e){
            System.out.println(e);
            return "x";

        }
    }

}
