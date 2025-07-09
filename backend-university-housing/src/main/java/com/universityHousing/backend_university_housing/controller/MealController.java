package com.universityHousing.backend_university_housing.controller;

import com.universityHousing.backend_university_housing.service.MealService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.cglib.core.Local;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("api")
@RequiredArgsConstructor
public class MealController {
    private final MealService mealService;

    @PostMapping("/admin/save-student-meal")
    public ResponseEntity<Map<String, String>> saveStudentMeal(@RequestParam("studentId") Integer studentId) {
        return mealService.recordStudentMeal(studentId);
    }
    @GetMapping("/admin/totalMeals")
    public ResponseEntity<Map<String, Integer>> getTotalMeals(@RequestParam(defaultValue = "") String localDate) {
        LocalDate date;
        if(localDate.isEmpty()){
            date = LocalDate.now();
        }else {
            date = LocalDate.parse(localDate);
        }

        return mealService.countMealsByMealDate(date);
    }
}
