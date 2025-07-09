package com.universityHousing.backend_university_housing.service;

import com.universityHousing.backend_university_housing.dao.RegistrationStatusRepository;
import com.universityHousing.backend_university_housing.entity.RegistrationStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class RegistrationStatusService {
    private final RegistrationStatusRepository registrationStatusRepository;
    public ResponseEntity<Map<String,Boolean>> getStatus(){
        var status= registrationStatusRepository.findById(1).orElseThrow().isOpen();
        return ResponseEntity.ok(Map.of("Status" ,  status));
    }
    public ResponseEntity<Map<String,Boolean>> setStatus(boolean status){
        RegistrationStatus regStatus=registrationStatusRepository.findById(1).orElse(new RegistrationStatus());
        regStatus.setOpen(status);
        regStatus.setUpdatedAt(LocalDateTime.now());
        registrationStatusRepository.save(regStatus);
        return ResponseEntity.ok(Map.of("Status" ,  status));
    }
}
