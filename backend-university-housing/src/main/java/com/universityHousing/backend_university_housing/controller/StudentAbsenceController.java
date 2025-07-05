package com.universityHousing.backend_university_housing.controller;

import com.universityHousing.backend_university_housing.dto.StudentAbsencesDTO;
import com.universityHousing.backend_university_housing.entity.StudentAbsences;
import com.universityHousing.backend_university_housing.service.StudentAbsenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class StudentAbsenceController {
    private final StudentAbsenceService studentAbsenceService;

    @GetMapping("/admin/studentAbsences")
    public ResponseEntity<List<StudentAbsencesDTO>>getStudentAbsencesByStudentId(@RequestParam(value = "studentId" ) int studentId){
        return studentAbsenceService.getStudentAbsences(studentId);
    }
    @GetMapping("/student/studentAbsences")
    public ResponseEntity<List<StudentAbsencesDTO>>getStudentAbsences(){
        return studentAbsenceService.getStudentAbsences();
    }

    @PostMapping("student/save/studentAbsence")
    public ResponseEntity<Map<String,String>>saveStudentAbsence(@RequestBody StudentAbsences studentAbsences){
        return studentAbsenceService.saveStudentAbsence(studentAbsences);
    }
}