package com.universityHousing.backend_university_housing.service;

import com.universityHousing.backend_university_housing.dao.employeeRepository.EmployeeRepository;
import com.universityHousing.backend_university_housing.entity.Employee;
import com.universityHousing.backend_university_housing.exception.ApiRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee saveEmployee(Employee employee) {
        boolean isExist = this.employeeRepository.findEmployeesByPhone(employee.getPhone()).isPresent() ||
                this.employeeRepository.findEmployeesByEmail(employee.getEmail()).isPresent() ||
                this.employeeRepository.findEmployeesByNationalId(employee.getNationalId()).isPresent();
        if (isExist) {
            throw new ApiRequestException("there is an Employee already exists have the same phone number or email or nationalId.");
        } else {
            return this.employeeRepository.save(employee);
        }
    }
}
