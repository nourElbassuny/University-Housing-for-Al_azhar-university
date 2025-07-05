package com.universityHousing.backend_university_housing.controller;

import com.universityHousing.backend_university_housing.dto.PaginatedResponse;
import com.universityHousing.backend_university_housing.dto.StudentDTO;
import com.universityHousing.backend_university_housing.entity.Employee;
import com.universityHousing.backend_university_housing.entity.Student;
import com.universityHousing.backend_university_housing.service.StudentFileService;
import com.universityHousing.backend_university_housing.service.StudentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api")
@RequiredArgsConstructor
public class StudentController {
    private final StudentService studentService;
    private final StudentFileService studentFileService;

    @GetMapping("/student/getStudentData")
    public ResponseEntity<StudentDTO>getCurrentStudentData(){
        return studentService.getCurrentStudentData();
    }
    @GetMapping("/admin/findStudentByRoomId/{id}")
    public ResponseEntity<List<StudentDTO>> findStudentByRoomId(@PathVariable Integer id){
        return studentService.findStudentByRoomId(id);
    }

    @GetMapping("/student/image")
    public ResponseEntity<Map<String,String>>getStudentImage(){
        return studentService.getStudentImage();
    }





    @GetMapping("/admin/all-students")
    public PaginatedResponse<StudentDTO> getStudentList(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "1") int size,
            HttpServletRequest request
    ) {
        Page<StudentDTO> students = studentService.getAllStudents(page, size);
        String baseUrl = request.getRequestURL().toString();
        String nextUrl = students.hasNext() ? String.format("%s?page=%d&size=%d", baseUrl, page + 1, size) : null;
        String previousUrl = students.hasPrevious() ? String.format("%s?page=%d&size=%d", baseUrl, page - 1, size) : null;

        var paginatedResponse = new PaginatedResponse<StudentDTO>(
                students.getContent(),
                students.getNumber(),
                students.getTotalPages(),
                students.getTotalElements(),
                students.hasNext(),
                students.hasNext(),
                nextUrl,
                previousUrl
        );
        return paginatedResponse;
    }

    @PostMapping("/student/save")
    public ResponseEntity<Map<String,String>> saveStudent(@RequestPart(name = "student") Student student,
                                           @RequestPart(name = "image") MultipartFile image,
                                           @RequestPart(name = "file") MultipartFile file) throws IOException {
       return studentService.saveStudent(student,image,file);
    }

    @GetMapping("/student/message")
    public ResponseEntity<String> getStudentMessage() {
        return new ResponseEntity<>("Wecommando", HttpStatus.OK);
    }
}
