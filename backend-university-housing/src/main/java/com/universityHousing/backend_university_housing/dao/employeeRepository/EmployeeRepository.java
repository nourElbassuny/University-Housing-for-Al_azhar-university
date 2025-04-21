package com.universityHousing.backend_university_housing.dao.employeeRepository;

import com.universityHousing.backend_university_housing.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


import java.util.Optional;
@RepositoryRestResource
public interface EmployeeRepository extends JpaRepository<Employee, Integer>,EmployeeCustomRepository {
    Optional<Employee> findEmployeeByPhone(String phone);
    Optional<Employee>findEmployeeByNationalId(String nationalId);
}
