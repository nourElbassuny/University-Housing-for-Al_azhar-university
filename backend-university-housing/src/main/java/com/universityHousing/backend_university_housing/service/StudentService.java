package com.universityHousing.backend_university_housing.service;

import com.universityHousing.backend_university_housing.dao.studentRepository.StudentRepo;
import com.universityHousing.backend_university_housing.dto.StudentDTO;
import com.universityHousing.backend_university_housing.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentService {
    private final StudentRepo studentRepo;

    @Autowired
    public StudentService(StudentRepo studentRepo) {
        this.studentRepo = studentRepo;
    }


    public List<StudentDTO> getStudentList() {
        List<Object[]> students = studentRepo.findStudentList();
        List<StudentDTO> studentDTOS = new ArrayList<>();
        for (Object[] row : students) {
            StudentDTO dto = new StudentDTO(
                    ((Number) row[0]).intValue(),
                    (String) row[1],
                    (String) row[2],
                    (String) row[3],
                    (String) row[4],
                    (String) row[5],
                    (String) row[6],
                    (String) row[7]
            );
            studentDTOS.add(dto);
        }
        return studentDTOS;
    }

    public List<StudentDTO> getAllStudents() {
        List<Student> students = studentRepo.findAll();
        return students.stream().map(s -> new StudentDTO(
                s.getId(),
                s.getName(),
                s.getEmail(),
                s.getPhone(),
                s.getGender(),
                s.getBirthday(),
                s.getCity(),
                s.getAddress(),
                s.getColleague(),
                s.getDepartment(),
                s.getGrade(),
                s.getStage(),
                s.getGovernorate(),
                s.getStatus(),
                s.getNationalId()
        )).collect(Collectors.toList());
    }

    @Transactional
    public Student saveStudent(Student student, MultipartFile imageFile) throws IOException {
        if (imageFile != null && !imageFile.isEmpty()) {
            student.setImage(imageFile.getBytes());
        }
        return studentRepo.save(student);
    }

    public ResponseEntity<byte[]> getImage(int id) {
        Student student = studentRepo.findById(id).orElseThrow(() -> new RuntimeException("Student not found"));
        byte[] image = student.getImage();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG); // Or PNG, depending on what you expect
        return new ResponseEntity<>(image, headers, HttpStatus.OK);
    }

    public List<StudentDTO> getStudentByRoomId(int roomId) {
        List<Object[]> studentsObject = studentRepo.findStudentsByRoomId(roomId);
        List<StudentDTO> studentDTOS = new ArrayList<>();
        for (Object[] row : studentsObject) {
            studentDTOS.add(new StudentDTO(
                    ((Number) row[0]).intValue(),
                    (String) row[1],
                    (String) row[2],
                    (String) row[3],
                    (String) row[4],
                    (String) row[5],
                    (String) row[6],
                    (String) row[7]
                    )
            );
        }
        return studentDTOS;
    }
}
