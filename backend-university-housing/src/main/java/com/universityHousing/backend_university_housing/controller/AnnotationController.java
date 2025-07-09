package com.universityHousing.backend_university_housing.controller;

import com.universityHousing.backend_university_housing.entity.Annotation;
import com.universityHousing.backend_university_housing.service.AnnotationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AnnotationController {
    private final AnnotationService annotationService;
    @PostMapping("/admin/save/annotation")
    public ResponseEntity<Map<String,String>> saveAnnotation(@RequestBody Annotation annotation) {
        return annotationService.save(annotation);
    }
    @GetMapping("/auth/getAllAnnotation")
    public ResponseEntity<List<Annotation>> getAllAnnotation() {
        return annotationService.getAnnotations();
    }
    @DeleteMapping("/admin/deleteAnnotation/{id}")
    public ResponseEntity<Map<String,String>> deleteAnnotation(@PathVariable int id) {
        return annotationService.delete(id);
    }
}
