package com.universityHousing.backend_university_housing.controller;

import com.universityHousing.backend_university_housing.service.StudentFileService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api")
@RequiredArgsConstructor
public class StudentFileController {
    private final StudentFileService studentFileService;



    @GetMapping("/auth/studentFile/{id}")
    public ResponseEntity<byte[]>getStudentFile(@PathVariable("id") int id){
      return studentFileService.getFile(id);
    }
}
