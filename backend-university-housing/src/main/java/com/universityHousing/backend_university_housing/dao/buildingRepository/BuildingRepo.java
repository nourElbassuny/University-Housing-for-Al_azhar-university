package com.universityHousing.backend_university_housing.dao.buildingRepository;

import com.universityHousing.backend_university_housing.entity.Building;
import com.universityHousing.backend_university_housing.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface BuildingRepo extends JpaRepository<Building, Integer> {

}
