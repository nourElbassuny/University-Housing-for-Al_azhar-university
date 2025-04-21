package com.universityHousing.backend_university_housing.controller;

import com.universityHousing.backend_university_housing.service.StudentFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/studentFile")
public class StudentFileController {
    private final StudentFileService studentFileService;

    @Autowired
    public StudentFileController(StudentFileService service){
        this.studentFileService=service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]>getStudentFile(@PathVariable("id") int id){
      return studentFileService.getFile(id);
    }
}
