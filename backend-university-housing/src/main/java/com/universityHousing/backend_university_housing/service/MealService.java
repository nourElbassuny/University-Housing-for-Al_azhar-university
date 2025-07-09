package com.universityHousing.backend_university_housing.service;

import com.universityHousing.backend_university_housing.dao.MealsRepository;
import com.universityHousing.backend_university_housing.dao.StudentAbsenceRepository;
import com.universityHousing.backend_university_housing.dao.studentRepository.StudentRepo;
import com.universityHousing.backend_university_housing.entity.Meals;
import com.universityHousing.backend_university_housing.entity.Student;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class MealService {
    private final MealsRepository mealsRepository;
    private final StudentRepo studentRepository;
    private final StudentAbsenceRepository studentAbsenceRepository;

    @Transactional
    public ResponseEntity<Map<String, String>> recordStudentMeal(Integer studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + studentId));

        if (!student.getStatus().equals("مقبول")){
            return ResponseEntity.ok(Map.of("status", "❌ الطالب غير موجود "));
        }

        LocalDate today = LocalDate.now();
        boolean isExistsMeal = mealsRepository.findByStudentIdAndMealDate(studentId, today).isPresent();
        if (isExistsMeal) {
            return ResponseEntity.ok(Map.of("status", "❌ الطالب تم مسحه بالفعل"));
        }
        boolean status= studentAbsenceRepository.getStudentAbsencesStatusByStudentId(studentId, LocalDate.now()).isPresent();
        if (status) {
            return ResponseEntity.ok(Map.of("status", "❌ الطالب غائب"));
        }

        Meals meals = Meals.builder()
                .student(student)
                .mealDate(today)
                .build();

        mealsRepository.save(meals);
        return ResponseEntity.ok(Map.of("status", "✅ تم تسجيل الطالب"));
    }

    public ResponseEntity<Map<String,Integer>>countMealsByMealDate(LocalDate today) {
        return ResponseEntity.ok(Map.of("totalMeals", mealsRepository.countByMealDate(today)));
    }

}
