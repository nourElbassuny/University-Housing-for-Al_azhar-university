package com.universityHousing.backend_university_housing.controller;

import com.universityHousing.backend_university_housing.request.ChangePasswordRequest;
import com.universityHousing.backend_university_housing.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PatchMapping("/student/changePassword")
    public ResponseEntity<Map<String,String>> changePassword(@RequestBody ChangePasswordRequest request,
                                                             Principal principal){
        userService.changePassword(request,principal);
        return ResponseEntity.ok(Map.of("message", "Password changed successfully"));
    }
}
