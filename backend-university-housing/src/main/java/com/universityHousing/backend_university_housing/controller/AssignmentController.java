package com.universityHousing.backend_university_housing.controller;

import com.universityHousing.backend_university_housing.dto.AssignmentDTO;
import com.universityHousing.backend_university_housing.entity.Assignment;
import com.universityHousing.backend_university_housing.service.AssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api")
@RequiredArgsConstructor
public class AssignmentController {
    private final AssignmentService assignmentService;

    @GetMapping("/admin/assignments")
    public List<AssignmentDTO> getAllAssignments() {
        return assignmentService.getAllAssignments();
    }
    @GetMapping("/student/student-assignment")
    public ResponseEntity<Map<String,Boolean>>getStudentAssignment() {
        return assignmentService.getStudentAssignmentStatus();
    }

    @PostMapping("/student/booking-room")
    public ResponseEntity<Map<String, String>> addAssignment(@RequestParam(name = "roomId") int roomId) {
        return assignmentService.saveAssignment(roomId);
    }
}
