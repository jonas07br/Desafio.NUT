package dev.jonas.DesafioNut.Security;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import dev.jonas.DesafioNut.Security.JWT.JWTFilter;

@SuppressWarnings("deprecation")
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
    
    @Bean
    public BCryptPasswordEncoder encoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService setInMemoryUsers(){
        UserDetails user = User.builder()
            .username("admin")
            .password(encoder().encode("admin"))
            .roles("MANAGERS")
            .build();

        UserDetails user2 = User.builder()
            .username("user")
            .password(encoder().encode("user"))
            .roles("USERS")
            .build();
        
        return new InMemoryUserDetailsManager(user,user2);
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200")); 
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true); 

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Aplica CORS globalmente
        return source;
    }
    

    // @SuppressWarnings("removal")
    // @Bean
    // public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    //     http
    //         .cors(Customizer.withDefaults())
    //         .csrf(csrf->csrf.disable())
    //         .addFilterAfter(new JWTFilter(), UsernamePasswordAuthenticationFilter.class)
    //         .authorizeHttpRequests(authorizeRequests ->authorizeRequests
    //             .requestMatchers("/login").permitAll()
    //             .requestMatchers("/metrics-websocket/**").hasAnyRole("MANAGERS")
    //             .requestMatchers(HttpMethod.GET,"/teste").hasAnyRole("MANAGERS")
    //             .anyRequest().authenticated()).sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);;
            
    //     return http.build();
    // }   
    @SuppressWarnings({ "removal" })
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        // http.headers().frameOptions().disable();
        http.cors().and().csrf().disable()
            // .addFilterAfter(new JWTFilter(), UsernamePasswordAuthenticationFilter.class)
            .authorizeRequests()
            .requestMatchers("/").permitAll()
            .requestMatchers(HttpMethod.POST,"/login").hasAnyRole("USERS","MANAGERS")
            .requestMatchers("/teste").hasAnyRole("MANAGERS")
            .requestMatchers("/metrics-websocket/**").permitAll()
            .anyRequest().authenticated().and().httpBasic(Customizer.withDefaults());
            // .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        return http.build();
    }
}
