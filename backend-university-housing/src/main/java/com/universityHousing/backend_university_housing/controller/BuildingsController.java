package com.universityHousing.backend_university_housing.controller;

import com.universityHousing.backend_university_housing.entity.Building;
import com.universityHousing.backend_university_housing.service.BuildingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("api")
public class BuildingsController {
    private final BuildingService buildingService;

    @Autowired
    public BuildingsController(BuildingService buildingService) {
        this.buildingService = buildingService;
    }

    @GetMapping("/buildings")
    public List<Building> getAllBuildings() {
       return buildingService.findAll();
    }
}
