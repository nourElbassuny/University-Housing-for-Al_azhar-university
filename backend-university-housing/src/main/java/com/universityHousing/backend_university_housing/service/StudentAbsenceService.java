package com.universityHousing.backend_university_housing.service;

import com.universityHousing.backend_university_housing.dao.StudentAbsenceRepository;
import com.universityHousing.backend_university_housing.dao.studentRepository.StudentRepo;
import com.universityHousing.backend_university_housing.dto.StudentAbsencesDTO;
import com.universityHousing.backend_university_housing.entity.Student;
import com.universityHousing.backend_university_housing.entity.StudentAbsences;
import com.universityHousing.backend_university_housing.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class StudentAbsenceService {
    private final StudentAbsenceRepository studentAbsenceRepository;
    private final StudentRepo studentRepo;

    public ResponseEntity<Map<String,String>> saveStudentAbsence(StudentAbsences studentAbsences) {
        User currentUser=getCurrentUser();
        Student currntStudent=studentRepo.findStudentById(currentUser.getId()).orElseThrow(()->new RuntimeException("this user is not found"));
        studentAbsences.setStudent(currntStudent);
        studentAbsenceRepository.save(studentAbsences);
        return ResponseEntity.ok(Map.of("message","successfully saved"));
    }

    public ResponseEntity<List<StudentAbsencesDTO>> getStudentAbsences(Integer studentId) {
        return ResponseEntity.ok(studentAbsenceRepository.findStudentAbsencesByStudentId(studentId));
    }

    public ResponseEntity<List<StudentAbsencesDTO>> getStudentAbsences() {
        var currentUser= getCurrentUser();
        return ResponseEntity.ok(studentAbsenceRepository.findStudentAbsencesByStudentId(currentUser.getId()));
    }
    private User getCurrentUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
