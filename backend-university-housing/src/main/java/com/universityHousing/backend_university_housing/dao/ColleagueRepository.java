package com.universityHousing.backend_university_housing.dao;

import com.universityHousing.backend_university_housing.entity.Colleague;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ColleagueRepository extends JpaRepository<Colleague, Integer> {
}
