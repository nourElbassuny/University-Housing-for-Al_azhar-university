package com.universityHousing.backend_university_housing.service;

import com.universityHousing.backend_university_housing.dao.employeeRepository.EmployeeRepository;
import com.universityHousing.backend_university_housing.entity.Employee;
import com.universityHousing.backend_university_housing.error.GlobalException;
import com.universityHousing.backend_university_housing.error.exception.EmployeeNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
    private EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeService( EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }
    public ResponseEntity<?> getEmployeeByPhone(String phone) {
       Optional<Employee>employee= this.employeeRepository.findEmployeeByPhone(phone);
        if (employee.isEmpty()){
            return   GlobalException.handleEmployeeNotFoundException(new EmployeeNotFoundException("Employee not found with phone: "+phone));
        }else {
            return ResponseEntity.ok(employee);
        }
    }

    public ResponseEntity<?> getEmployeeByNationalId(String nationalId) {
        Optional<Employee>employee= this.employeeRepository.findEmployeeByNationalId(nationalId);
        if (employee.isEmpty()){
            return   GlobalException.handleEmployeeNotFoundException(new EmployeeNotFoundException("Employee not found with nationalId: "+nationalId));
        }else {
            return ResponseEntity.ok(employee.get());
        }
    }

    public List<Employee>getEmployeesByName(String name){
       return this.employeeRepository.getEmployeesByName(name);
    }

    public List<Employee>getEmployeesByJobTitle(String jobTitle){
        return this.employeeRepository.getEmployeesByJob(jobTitle);
    }

    public Employee saveEmployee(Employee employee) {
        return this.employeeRepository.save(employee);
    }
}
