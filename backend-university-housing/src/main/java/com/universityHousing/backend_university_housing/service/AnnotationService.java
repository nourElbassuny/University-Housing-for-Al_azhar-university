package com.universityHousing.backend_university_housing.service;

import com.universityHousing.backend_university_housing.dao.AnnotationRepository;
import com.universityHousing.backend_university_housing.entity.Annotation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AnnotationService {
    private final AnnotationRepository annotationRepository;

    public ResponseEntity<List<Annotation>> getAnnotations() {
        var annotations= annotationRepository.findAll();
        return ResponseEntity.ok(annotations);
    }
    public ResponseEntity<Map<String,String>> save(Annotation annotation) {

        annotationRepository.save(annotation);

        return ResponseEntity.ok(Map.of("message", "Successfully saved annotation"));
    }


    public ResponseEntity<Map<String,String>> delete(Integer AnnotationId) {
        annotationRepository.deleteById(AnnotationId);
        return ResponseEntity.ok(Map.of("message", "Successfully deleted annotation"));
    }
}
