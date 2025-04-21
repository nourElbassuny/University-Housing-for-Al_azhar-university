package com.universityHousing.backend_university_housing.controller;

import com.universityHousing.backend_university_housing.entity.Employee;
import com.universityHousing.backend_university_housing.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/employees")
public class EmployeeController {
    private final EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping()
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }
    @PostMapping()
    public Employee createEmployee(@RequestBody Employee employee) {
        return employeeService.saveEmployee(employee);
    }

    @GetMapping("/findByName/{name}")
    public List<Employee> findByName(@PathVariable("name") String name) {
        return employeeService.getEmployeesByName(name);
    }

    @GetMapping("/findByJob/{job}")
    public List<Employee> findByJob(@PathVariable("job") String job) {
        return employeeService.getEmployeesByJobTitle(job);
    }
    @GetMapping("/findByPhone/{phone}")
    public ResponseEntity<?> findByPhone(@PathVariable("phone") String phone) {
        return employeeService.getEmployeeByPhone(phone);
    }
    @GetMapping("/findByNationalId/{nationalId}")
    public ResponseEntity<?> findByNationalId(@PathVariable("nationalId") String nationalId) {
        return employeeService.getEmployeeByNationalId(nationalId);
    }
}
