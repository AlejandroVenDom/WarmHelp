package com.warmhelp.app.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class StaticResourceConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/uploads/images/**")
                .addResourceLocations("file:C:/Users/aleja/Desktop/WarmHelp/backendSB/uploads/images/");

    }

//    C:/Users/bp113/Angular/TFG_WarmHelp/WarmHelp/backendSB/uploads/images -> ruta bryan

    // C:/JavaStuff/Angular/WarmHelp/WarmHelp/backendSB/uploads/images/ ruta Rusoski
    // C:/Users/aleja/Desktop/WarmHelp/backendSB/uploads/images/ ruta alejandro
}
