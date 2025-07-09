package com.universityHousing.backend_university_housing.controller;

import com.universityHousing.backend_university_housing.service.RegistrationStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class RegistrationStatusController {
    private final RegistrationStatusService registrationStatusService;

    @GetMapping("/auth/get-status")
    public ResponseEntity<Map<String, Boolean>> getStatus() {
        return  registrationStatusService.getStatus();
    }
    @GetMapping("/admin/change-status")
    public ResponseEntity<Map<String,Boolean>> updateRegistrationStatus(@RequestParam(name = "status") boolean status){
        return registrationStatusService.setStatus(status);
    }
    @GetMapping("/test")
    public Map<String, Boolean> test() {
        return Map.of("hello", true);
    }
}
