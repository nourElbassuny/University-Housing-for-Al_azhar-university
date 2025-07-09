package com.universityHousing.backend_university_housing.controller;

import com.universityHousing.backend_university_housing.dto.PaginatedResponse;
import com.universityHousing.backend_university_housing.dto.StudentDTO;
import com.universityHousing.backend_university_housing.entity.Employee;
import com.universityHousing.backend_university_housing.entity.Student;
import com.universityHousing.backend_university_housing.request.StudentFilterRequest;
import com.universityHousing.backend_university_housing.service.StudentFileService;
import com.universityHousing.backend_university_housing.service.StudentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api")
@RequiredArgsConstructor
public class StudentController {
    private final StudentService studentService;
    private final StudentFileService studentFileService;

    @GetMapping("/student/getStudentData")
    public ResponseEntity<StudentDTO> getCurrentStudentData() {
        return studentService.getCurrentStudentData();
    }

    @GetMapping("/admin/getStudentById/{id}")
    public ResponseEntity<StudentDTO> getStudentById(@PathVariable int id) {
        return studentService.getStudentByID(id);
    }

    @GetMapping("/admin/findStudentByRoomId/{id}")
    public ResponseEntity<List<StudentDTO>> findStudentByRoomId(@PathVariable Integer id) {
        return studentService.findStudentByRoomId(id);
    }

    @GetMapping("/student/image")
    public ResponseEntity<Map<String, String>> getStudentImage() {
        return studentService.getStudentImage();
    }

    @GetMapping("/admin/student-image/{id}")
    public ResponseEntity<Map<String, String>> getStudentImage(@PathVariable Integer id) {
        return studentService.getStudentImage(id);
    }

    @PatchMapping("/admin/change-student-status")
    public ResponseEntity<Map<String, String>> changeStudentStatus(@RequestParam(name = "studentId") int studentId, @RequestParam(name = "status") String status) {
        return studentService.changeStudentStatus(studentId, status);
    }

    @GetMapping("/admin/get-students-withFilter")
    public PaginatedResponse<StudentDTO> getStudentsWithFilter(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @ModelAttribute StudentFilterRequest filter,
            HttpServletRequest request) {
        Page<StudentDTO> students = studentService.getStudentWithFilter(page, size, filter);
        String baseUrl = request.getRequestURL().toString();
        String nextUrl = students.hasNext() ? String.format("%s?page=%d&size=%d", baseUrl, page + 1, size) : null;
        String previousUrl = students.hasNext() ? String.format("%s?page=%d&size=%d", baseUrl, page - 1, size) : null;
        return new PaginatedResponse<StudentDTO>(
                students.getContent(),
                students.getNumber(),
                students.getTotalPages(),
                students.getTotalElements(),
                students.hasNext(),
                students.hasPrevious(),
                nextUrl,
                previousUrl
        );
    }

    @GetMapping("/admin/all-students")
    public PaginatedResponse<StudentDTO> getStudentList(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
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
    public ResponseEntity<Map<String, String>> saveStudent(@RequestPart(name = "student") Student student,
                                                           @RequestPart(name = "image") MultipartFile image,
                                                           @RequestPart(name = "file") MultipartFile file) throws IOException {
        return studentService.saveStudent(student, image, file);
    }

    @GetMapping("/admin/studentByRoomID")
    public ResponseEntity<List<StudentDTO>> findStudentByRoomId(@RequestParam int roomId) {
        return studentService.findStudentByRoomId(roomId);
    }

    @GetMapping("/student/message")
    public ResponseEntity<String> getStudentMessage() {
        return new ResponseEntity<>("Wecommando", HttpStatus.OK);
    }

    @GetMapping("/admin/numberOf-present-student")
    public ResponseEntity<Map<String, Integer>> getStudentPresent(@RequestParam LocalDate date) {
        return studentService.countPresentStudents(date);
    }
}
