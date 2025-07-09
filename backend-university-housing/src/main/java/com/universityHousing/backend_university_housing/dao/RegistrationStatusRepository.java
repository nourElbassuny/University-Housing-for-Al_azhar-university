package com.universityHousing.backend_university_housing.dao;

import com.universityHousing.backend_university_housing.entity.RegistrationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegistrationStatusRepository extends JpaRepository<RegistrationStatus, Integer> {
}
