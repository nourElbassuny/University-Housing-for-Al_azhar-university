package com.universityHousing.backend_university_housing.dao;

import com.universityHousing.backend_university_housing.entity.Annotation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnnotationRepository extends JpaRepository<Annotation, Integer> {
}
