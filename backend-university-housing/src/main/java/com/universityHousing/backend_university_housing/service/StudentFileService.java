package com.universityHousing.backend_university_housing.service;

import com.universityHousing.backend_university_housing.dao.studentFiles.StudentFileRepository;
import com.universityHousing.backend_university_housing.dao.studentRepository.StudentRepo;
import com.universityHousing.backend_university_housing.entity.Student;
import com.universityHousing.backend_university_housing.entity.StudentFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class StudentFileService {
    private StudentRepo studentRepo;

    @Autowired
    public StudentFileService(StudentRepo studentRepo) {
        this.studentRepo = studentRepo;
    }

    @Transactional
    public void saveFile(int studentId, MultipartFile file) throws IOException {
       Student student=studentRepo.findStudentById(studentId).orElseThrow(()->new RuntimeException("Student not found with ID: " + studentId));
        StudentFile studentFile=new StudentFile();
        studentFile.setFileData(file.getBytes());
        student.setStudentFile(studentFile);
        studentFile.setStudent(student);
        studentRepo.save(student);
    }

    public ResponseEntity<byte[]> getFile(int id){
        Student student=studentRepo.findStudentById(id).orElseThrow(()->new RuntimeException("Student not found"));
        byte[]file=student.getStudentFile().getFileData();
        HttpHeaders headers=new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        return new ResponseEntity<>(file,headers, HttpStatus.OK);
    }

}
