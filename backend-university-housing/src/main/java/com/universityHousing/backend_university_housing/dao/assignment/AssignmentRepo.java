package com.universityHousing.backend_university_housing.dao.assignment;

import com.universityHousing.backend_university_housing.entity.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssignmentRepo extends JpaRepository<Assignment, Integer> {
}
