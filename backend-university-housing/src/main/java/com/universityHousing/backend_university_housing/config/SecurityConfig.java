package com.universityHousing.backend_university_housing.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;

import static com.universityHousing.backend_university_housing.entity.Permission.*;
import static org.springframework.http.HttpMethod.*;
import static com.universityHousing.backend_university_housing.entity.Role.*;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    private final LogoutHandler logoutHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll()

                        .requestMatchers("/api/student/**").hasAnyRole(ADMIN.name(), STUDENT.name())


                        .requestMatchers(GET, "/api/student/**").hasAnyAuthority(ADMIN_READ.name(), STUDENT_READ.name())
                        .requestMatchers(POST, "/api/student/**").hasAnyAuthority(ADMIN_CREATE.name(), STUDENT_READ.name())
                        .requestMatchers(PUT, "/api/student/**").hasAnyAuthority(ADMIN_UPDATE.name(), STUDENT_UPDATE.name())
                        .requestMatchers(DELETE, "/api/student/**").hasAnyAuthority(ADMIN_DELETE.name(), STUDENT_DELETE.name())

                        .requestMatchers("/api/admin/**").hasRole(ADMIN.name())

                        .requestMatchers(GET, "/api/admin/**").hasAuthority(ADMIN_READ.name())
                        .requestMatchers(POST, "/api/admin/**").hasAuthority(ADMIN_CREATE.name())
                        .requestMatchers(PUT, "/api/admin/**").hasAuthority(ADMIN_UPDATE.name())
                        .requestMatchers(DELETE, "/api/admin/**").hasAuthority(ADMIN_DELETE.name())
                        .anyRequest()
                        .authenticated()
                )
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .logout(logout -> {
                    logout.logoutUrl("/api/aut/logout")
                            .addLogoutHandler(logoutHandler)
                            .logoutSuccessHandler(((request, response, authentication) ->
                                    SecurityContextHolder.clearContext()));
                });

        return http.build();
    }
}
