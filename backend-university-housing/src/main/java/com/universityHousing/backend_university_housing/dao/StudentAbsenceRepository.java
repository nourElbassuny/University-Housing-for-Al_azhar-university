package com.universityHousing.backend_university_housing.dao;

import com.universityHousing.backend_university_housing.dto.StudentAbsencesDTO;
import com.universityHousing.backend_university_housing.entity.StudentAbsences;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentAbsenceRepository extends JpaRepository<StudentAbsences,Integer> {
    List<StudentAbsencesDTO>findStudentAbsencesByStudentId(Integer studentId);
}
