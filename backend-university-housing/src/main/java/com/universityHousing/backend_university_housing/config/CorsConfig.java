package com.universityHousing.backend_university_housing.config;

import jakarta.annotation.Nonnull;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer webMvcConfigurer(){
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@Nonnull CorsRegistry registry) {
               registry.addMapping("/**")
                       .allowedOrigins("http://localhost:4200")
                       .allowedMethods("*")
                       .allowedHeaders("*")
                       .allowCredentials(true);

            }
        };
    }
}
