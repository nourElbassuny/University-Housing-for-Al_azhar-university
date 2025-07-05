package com.universityHousing.backend_university_housing.dao.state;

import com.universityHousing.backend_university_housing.entity.States;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StatesRepository extends JpaRepository<States, Integer> {
    List<States>findStatesByGovernoratesId(int governoratesId);
}
