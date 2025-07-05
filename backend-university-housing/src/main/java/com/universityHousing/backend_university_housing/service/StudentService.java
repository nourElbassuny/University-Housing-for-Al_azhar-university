package com.universityHousing.backend_university_housing.service;


import com.universityHousing.backend_university_housing.dao.studentRepository.StudentRepo;
import com.universityHousing.backend_university_housing.dto.StudentDTO;
import com.universityHousing.backend_university_housing.entity.Student;
import com.universityHousing.backend_university_housing.entity.StudentFile;
import com.universityHousing.backend_university_housing.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Map;


@Service
@RequiredArgsConstructor
public class StudentService {
    private final StudentRepo studentRepo;

    public Page<StudentDTO> getAllStudents(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return studentRepo.findAllStudent(pageable);
    }



    public ResponseEntity<List<StudentDTO>> findStudentByRoomId(int roomId) {
        var students = studentRepo.findStudentsByRoomId(roomId).orElseThrow(() -> new RuntimeException("this room is empty"));
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    public ResponseEntity<StudentDTO> getCurrentStudentData() {
        var userId = getCurrentUser().getId();
        var student = studentRepo.findStudent(userId).orElseThrow(() -> new RuntimeException("this student is not found"));

        return new ResponseEntity<>(student, HttpStatus.OK);
    }

    public ResponseEntity<Map<String,String>>getStudentImage(){
        var userId = getCurrentUser().getId();
        var studentImage=studentRepo.findStudentImageById(userId).orElseThrow(() -> new RuntimeException("this student is not found"));
        String base64Image= Base64.getEncoder().encodeToString(studentImage);
        return ResponseEntity.ok(Map.of("image", base64Image));
    }

    @Transactional
    public ResponseEntity<Map<String, String>> saveStudent(Student studentInput,
                                                           MultipartFile image,
                                                           MultipartFile file) throws IOException {

        if (studentInput == null || image.isEmpty() || file.isEmpty()) {
            return ResponseEntity.ok(Map.of("message", "Something went wrong"));
        }
        var userId = getCurrentUser().getId();
        Student student = studentRepo.findStudentById(userId).orElseThrow(
                () -> new RuntimeException("Student Not Found")
        );


        student.setArabicName(studentInput.getArabicName());
        student.setEnglishName(studentInput.getEnglishName());
        student.setPhone(studentInput.getPhone());
        student.setGender(studentInput.getGender());
        student.setState(studentInput.getState());
        student.setAddress(studentInput.getAddress());
        student.setColleague(studentInput.getColleague());
        student.setDepartment(studentInput.getDepartment());
        student.setGrade(studentInput.getGrade());
        student.setStage(studentInput.getStage());
        student.setGovernorate(studentInput.getGovernorate());
        student.setStatus(studentInput.getStatus());
        student.setNationalId(studentInput.getNationalId());
        student.setBirthday(studentInput.getBirthday());
        student.setImage(image.getBytes());
        ;

        StudentFile studentFile = new StudentFile();
        studentFile.setFileData(file.getBytes());
        studentFile.setStudent(student);
        student.setStudentFile(studentFile);
        studentRepo.save(student);
        return ResponseEntity.ok(Map.of("message", "Student saved successfully"));
    }

    private User getCurrentUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

}
