package com.universityHousing.backend_university_housing.dao;

import com.universityHousing.backend_university_housing.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DepartmentRepository extends JpaRepository<Department, Integer> {
    List<Department>findDepartmentByColleagueId(Integer colleagueId);
}
