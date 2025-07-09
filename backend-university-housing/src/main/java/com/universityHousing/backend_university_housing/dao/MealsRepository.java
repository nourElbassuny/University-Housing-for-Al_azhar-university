package com.universityHousing.backend_university_housing.dao;

import com.universityHousing.backend_university_housing.entity.Meals;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Date;
import java.util.Optional;

public interface MealsRepository extends JpaRepository<Meals, Integer> {
    Optional<Meals>findByStudentIdAndMealDate(Integer studentId, LocalDate mealDate);
    Integer countByMealDate(LocalDate mealDate);
}
