package com.warmhelp.app.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class StaticResourceConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/uploads/images/**")
                .addResourceLocations("file:C:/JavaStuff/Angular/WarmHelp/WarmHelp/backendSB/uploads/images/");

    }

    //    C:/Users/bp113/Angular/TFG_WarmHelp/WarmHelp/backendSB/uploads/images -> ruta Bryan
    // C:/JavaStuff/Angular/WarmHelp/WarmHelp/backendSB/uploads/images/ -> ruta Andrey
    // C:/Users/aleja/Desktop/WarmHelp/backendSB/uploads/images/ -> ruta Alejandro
}
