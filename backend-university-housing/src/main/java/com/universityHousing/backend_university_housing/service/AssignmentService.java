package com.universityHousing.backend_university_housing.service;

import com.universityHousing.backend_university_housing.dao.RoomRepository.RoomRepo;
import com.universityHousing.backend_university_housing.dao.assignment.AssignmentRepo;
import com.universityHousing.backend_university_housing.dao.studentRepository.StudentRepo;
import com.universityHousing.backend_university_housing.dto.AssignmentDTO;
import com.universityHousing.backend_university_housing.entity.Assignment;
import com.universityHousing.backend_university_housing.entity.Room;
import com.universityHousing.backend_university_housing.entity.Student;
import com.universityHousing.backend_university_housing.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AssignmentService {
    private AssignmentRepo assignmentRepo;
    private StudentRepo studentRepo;
    private RoomRepo roomRepo;

    @Autowired
    public AssignmentService(AssignmentRepo assignmentRepo, StudentRepo studentRepo, RoomRepo roomRepo) {
        this.assignmentRepo = assignmentRepo;
        this.studentRepo = studentRepo;
        this.roomRepo = roomRepo;
    }

    public List<AssignmentDTO> getAllAssignments() {
        return assignmentRepo.findAll().stream().map(
                        a -> new AssignmentDTO(a.getId(),
                                a.getStudent().getId(),
                                a.getRooms().getId(),
                                a.getAssignedDate()))
                .collect(Collectors.toList());
    }


    @Transactional
    public ResponseEntity<Map<String,String>> saveAssignment(int roomId) {
        int studentId = getCurrentUser().getId();
        Student student = studentRepo.findById(studentId).orElseThrow(() -> new RuntimeException("Student not found"));
        Room room = roomRepo.findById(roomId).orElseThrow(() -> new RuntimeException("Room not found"));
        if (room.getCurrentCapacity()>=room.getCapacity()){
            return ResponseEntity.ok(Map.of("message", "Room capacity exceeded"));
        }

        Assignment assignment = new Assignment(student, room, new Timestamp(System.currentTimeMillis()));
        room.setCurrentCapacity(room.getCurrentCapacity()+1);
        roomRepo.save(room);
        assignmentRepo.save(assignment);
        return ResponseEntity.ok(Map.of("message", "Assignment saved"));
    }

    public ResponseEntity<Map<String, Boolean>> getStudentAssignmentStatus() {
        int studentId = getCurrentUser().getId();
        boolean status = assignmentRepo.findStudentAssigmentByStudentId(studentId).isPresent();
        return ResponseEntity.ok(Map.of("status", status));
    }

    private User getCurrentUser(){
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }


}
