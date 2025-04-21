package com.universityHousing.backend_university_housing.service;

import com.universityHousing.backend_university_housing.dao.buildingRepository.BuildingRepo;
import com.universityHousing.backend_university_housing.entity.Building;
import com.universityHousing.backend_university_housing.entity.Room;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BuildingService {
    private BuildingRepo buildingRepo;
    @Autowired
    public BuildingService(BuildingRepo buildingRepo) {
        this.buildingRepo = buildingRepo;
    }

    public List<Building> findAll() {
        return buildingRepo.findAll();
    }
}
