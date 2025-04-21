package com.universityHousing.backend_university_housing.dao.employeeRepository;

import com.universityHousing.backend_university_housing.entity.Employee;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

import java.util.List;

public class EmployeeCustomRepositoryImpl implements EmployeeCustomRepository{
    @PersistenceContext
    private EntityManager entityManager;
    @Override
    public List<Employee> getEmployeesByName(String name) {
        String sql="SELECT * FROM employees WHERE name COLLATE utf8mb4_unicode_ci LIKE :name";
        Query query=entityManager.createNativeQuery(sql,Employee.class)
                .setParameter("name","%"+name+"%");

        return query.getResultList();
    }

    @Override
    public List<Employee> getEmployeesByJob(String job) {
        String sql="SELECT * FROM employees WHERE job LIKE :name";
        Query query=entityManager.createNativeQuery(sql,Employee.class)
                .setParameter("name","%"+job+"%");

        return query.getResultList();
    }
}
