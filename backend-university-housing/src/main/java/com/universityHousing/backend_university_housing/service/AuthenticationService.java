package com.universityHousing.backend_university_housing.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.universityHousing.backend_university_housing.ENUM.Role;
import com.universityHousing.backend_university_housing.ENUM.TokenType;
import com.universityHousing.backend_university_housing.dao.employeeRepository.EmployeeRepository;
import com.universityHousing.backend_university_housing.dao.studentRepository.StudentRepo;
import com.universityHousing.backend_university_housing.dao.token.TokenRepo;
import com.universityHousing.backend_university_housing.dao.userRepository.UserRepository;
import com.universityHousing.backend_university_housing.entity.*;
import com.universityHousing.backend_university_housing.request.AuthenticationRequest;
import com.universityHousing.backend_university_housing.request.RegisterRequest;
import com.universityHousing.backend_university_housing.response.AuthenticationResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final TokenRepo tokenRepo;
    private final AuthenticationManager authenticationManager;
    private final StudentRepo studentRepo;
    private final EmployeeRepository employeeRepo;

    public AuthenticationResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return AuthenticationResponse.builder()
                    .registerStatus("Failed to register")
                    .accessToken(null)
                    .refreshToken(null)
                    .build();
        }
        User user;

//        if (request.getRole() == Role.STUDENT) {
            Student student = new Student();
            student.setEmail(request.getEmail());
            student.setPassword(passwordEncoder.encode(request.getPassword()));
            student.setRole(Role.STUDENT);
            user = student;
//        } else {
//            Employee employee = new Employee();
//            employee.setEmail(request.getEmail());
//            employee.setPassword(passwordEncoder.encode(request.getPassword()));
//            employee.setRole(Role.ADMIN);
//            user = employee;
//        }

        var savedUser = userRepository.save(user);
        var jwtToken = jwtService.generateToken(savedUser);
        var refreshToken = jwtService.generateRefreshToken(savedUser);
        var token = savedUserToken(savedUser, jwtToken);
        tokenRepo.save(token);

        return AuthenticationResponse.builder()
                .registerStatus("Successfully registered")
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    public AuthenticationResponse login(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        var token = savedUserToken(user, jwtToken);
        revokeAllUserTokens(user);
        tokenRepo.save(token);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    private void revokeAllUserTokens(User user) {
        var validUserToken = tokenRepo.findAllValidTokenByUser(user.getId());
        if (validUserToken.isEmpty()) {
            return;
        }
        validUserToken.forEach(t -> {
            t.setRevoked(true);
            t.setExpired(true);
        });
        tokenRepo.saveAll(validUserToken);
    }

    private Token savedUserToken(User savedUser, String jwtToken) {
        return Token.builder()
                .user(savedUser)
                .token(jwtToken)
                .tokenType(TokenType.BREAR)
                .revoked(false)
                .expired(false)
                .build();
    }

    public void refreshToken(HttpServletRequest request,
                             HttpServletResponse response) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken = null;
        final String userEmail;
        final String jwt;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }
        jwt = authHeader.substring(7);
        System.out.println(jwt);
        userEmail = jwtService.extractUsername(jwt);

        if (userEmail != null) {
            var user = this.userRepository.findByEmail(userEmail)
                    .orElseThrow();

            if (jwtService.isTokenValid(jwt, user)) {
                var accessToken = jwtService.generateToken(user);
                revokeAllUserTokens(user);
                savedUserToken(user, accessToken);
                var authResponse = AuthenticationResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build();
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }
}
