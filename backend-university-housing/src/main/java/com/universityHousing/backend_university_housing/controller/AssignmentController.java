package com.universityHousing.backend_university_housing.controller;

import com.universityHousing.backend_university_housing.dto.AssignmentDTO;
import com.universityHousing.backend_university_housing.entity.Assignment;
import com.universityHousing.backend_university_housing.service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/assignments")
public class AssignmentController {
    private final AssignmentService assignmentService;
    @Autowired
    public AssignmentController(AssignmentService assignmentService) {
        this.assignmentService = assignmentService;
    }
    @GetMapping
    public List<AssignmentDTO> getAllAssignments() {
        return assignmentService.getAllAssignments();
    }
    @PostMapping
    public ResponseEntity<String> addAssignment(@RequestParam int studentId, @RequestParam int roomId) {
        assignmentService.saveAssignment(studentId,roomId);
        return ResponseEntity.ok("Student assigned to room!");
    }
}
