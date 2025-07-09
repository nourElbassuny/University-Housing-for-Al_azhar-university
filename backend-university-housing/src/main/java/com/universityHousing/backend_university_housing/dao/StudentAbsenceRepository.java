package com.universityHousing.backend_university_housing.dao;

import com.universityHousing.backend_university_housing.dto.StudentAbsencesDTO;
import com.universityHousing.backend_university_housing.entity.StudentAbsences;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface StudentAbsenceRepository extends JpaRepository<StudentAbsences,Integer> {
    List<StudentAbsencesDTO>findStudentAbsencesByStudentId(Integer studentId);

    @Query("SELECT a from StudentAbsences a where a.student.id =:studentId AND (:today between a.startDate and a.endDate)")
    Optional<StudentAbsences>getStudentAbsencesStatusByStudentId(@Param("studentId") Integer studentId,
                                                             @Param("today") LocalDate today);
}
