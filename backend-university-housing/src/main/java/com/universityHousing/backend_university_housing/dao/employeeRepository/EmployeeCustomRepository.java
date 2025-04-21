package com.universityHousing.backend_university_housing.dao.employeeRepository;


import com.universityHousing.backend_university_housing.entity.Employee;

import java.util.List;


public interface EmployeeCustomRepository {
    List<Employee> getEmployeesByName(String name);

    List<Employee> getEmployeesByJob(String job);

}
