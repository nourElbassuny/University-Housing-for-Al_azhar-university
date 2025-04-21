package com.universityHousing.backend_university_housing.service;

import com.universityHousing.backend_university_housing.dao.RoomRepository.RoomRepo;
import com.universityHousing.backend_university_housing.dao.assignment.AssignmentRepo;
import com.universityHousing.backend_university_housing.dao.studentRepository.StudentRepo;
import com.universityHousing.backend_university_housing.dto.AssignmentDTO;
import com.universityHousing.backend_university_housing.entity.Assignment;
import com.universityHousing.backend_university_housing.entity.Room;
import com.universityHousing.backend_university_housing.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;
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
    public void saveAssignment(int studentId, int roomId) {
        Student student = studentRepo.findById(studentId).orElseThrow(() -> new RuntimeException("Student not found"));
        Room room = roomRepo.findById(roomId).orElseThrow(() -> new RuntimeException("Room not found"));
        Assignment assignment = new Assignment(student, room, new Timestamp(System.currentTimeMillis()));
        assignmentRepo.save(assignment);
    }
}
