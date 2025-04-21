package com.universityHousing.backend_university_housing.dao.studentRepository;

import com.universityHousing.backend_university_housing.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepo extends JpaRepository<Student, Integer>,StudentCustomRepo {
  Optional<Student> findStudentById(int id);
}
