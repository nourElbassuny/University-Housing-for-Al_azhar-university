package com.universityHousing.backend_university_housing.controller;

import com.universityHousing.backend_university_housing.entity.Colleague;
import com.universityHousing.backend_university_housing.entity.Department;
import com.universityHousing.backend_university_housing.entity.Governorates;
import com.universityHousing.backend_university_housing.entity.States;
import com.universityHousing.backend_university_housing.service.CommonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class CommonController {
    private final CommonService commonService;

    @GetMapping("/colleague")
    public ResponseEntity<List<Colleague>> department() {
        return ResponseEntity.ok(commonService.getAllColleagues());
    }

    @GetMapping("/departmentsByColleagueId")
    public ResponseEntity<List<Department>> findDepartmentsByColleagueId(@RequestParam(name = "colleagueId") int colleagueId) {
        return ResponseEntity.ok(commonService.findDepartmentByColleagueId(colleagueId));
    }

    @GetMapping("/governorate")
    public ResponseEntity<List<Governorates>> governorate() {
        return ResponseEntity.ok(commonService.getAllGovernorates());
    }

    @GetMapping("/statesByGovernorateId")
    public ResponseEntity<List<States>> findStatesByGovernorateId(@RequestParam(name = "governorateId") int id) {
        return ResponseEntity.ok(commonService.getAllStatesByGovernorateId(id));
    }
}
