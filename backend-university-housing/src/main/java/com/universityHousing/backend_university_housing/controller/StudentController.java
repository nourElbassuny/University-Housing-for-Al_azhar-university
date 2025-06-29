package com.universityHousing.backend_university_housing.controller;

import com.universityHousing.backend_university_housing.dto.StudentDTO;
import com.universityHousing.backend_university_housing.entity.Student;
import com.universityHousing.backend_university_housing.service.StudentFileService;
import com.universityHousing.backend_university_housing.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api")
@RequiredArgsConstructor
public class StudentController {
    private final StudentService studentService;
    private final StudentFileService studentFileService;

    @GetMapping("/admin/all-students")
    public List<StudentDTO> getStudentList(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ){
        return studentService.getStudentList();
    }



    @PostMapping("/student/save")
    public ResponseEntity<?> save( @RequestPart("student") Student student,
                                         @RequestPart(value = "image", required = false) MultipartFile image) {
        try {
            Student savaStudent=studentService.saveStudent(student,image);
            return ResponseEntity.ok(savaStudent);
        }catch (IOException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to save student or image");
        }
    }
    @GetMapping("/student/student-image/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable int id) {
        return studentService.getImage(id);
    }

    @GetMapping("/admin/findStudentByRoom/{id}")
    public List<StudentDTO> findStudentByRoom(@PathVariable int id) {
        return studentService.getStudentByRoomId(id);
    }
    @PostMapping("/student/saveFile/{id}")
    public ResponseEntity<?> saveStudentFile(@PathVariable("id")int studentId,@RequestPart(value = "file", required = false) MultipartFile file)  {
        try {
            this.studentFileService.saveFile(studentId,file);
            return ResponseEntity.ok(HttpStatus.ACCEPTED);
        }catch (IOException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to save student or image");
        }

    }
}
