package com.WebSocket.WebSocket.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@CrossOrigin
public class GlobalCorsConfiguration {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        // Configuración exacta como en tu imagen PHP
        config.addAllowedOrigin("http://localhost:4200");                      // Access-Control-Allow-Origin: *
        config.addAllowedMethod("POST");                  // POST
        config.addAllowedMethod("GET");                   // GET
        config.addAllowedMethod("OPTIONS");               // OPTIONS
        config.addAllowedMethod("PUT");                   // PUT
        config.addAllowedMethod("DELETE");                // DELETE
        config.addAllowedHeader("Content-Type");          // Content-Type
        config.addAllowedHeader("X-Auth-Token");          // X-Auth-Token
        config.addAllowedHeader("Origin");                // Origin
        config.addAllowedHeader("Authorization");         // Authorization

        source.registerCorsConfiguration("/**", config);  // Aplicar a todos los endpoints
        return new CorsFilter(source);
    }

}