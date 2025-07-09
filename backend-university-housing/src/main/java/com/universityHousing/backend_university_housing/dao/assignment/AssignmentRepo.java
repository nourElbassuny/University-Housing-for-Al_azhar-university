package com.universityHousing.backend_university_housing.dao.assignment;

import com.universityHousing.backend_university_housing.entity.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AssignmentRepo extends JpaRepository<Assignment, Integer> {

    @Query("select a from Assignment a where a.student.id = :id")
    Optional<Assignment> findStudentAssigmentByStudentId(@Param("id") Integer studentId);
}
