package com.universityHousing.backend_university_housing.dao.employeeRepository;

import com.universityHousing.backend_university_housing.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


import java.util.Optional;
@RepositoryRestResource
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    Optional<Employee>findEmployeesByEmail(String email);
    Optional<Employee>findEmployeesByNationalId(String nationalId);
    Optional<Employee>findEmployeesByPhone(String phone);
}
