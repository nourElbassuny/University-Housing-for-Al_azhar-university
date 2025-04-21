package com.universityHousing.backend_university_housing.dto;


import java.sql.Timestamp;

public class AssignmentDTO {
    private int id;
    private int studentId;
    private int roomId;
    private Timestamp assignedDate;

    public AssignmentDTO(int id, int studentId, int roomId, Timestamp assignedDate) {
        this.id = id;
        this.studentId = studentId;
        this.roomId = roomId;
        this.assignedDate = assignedDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getStudentId() {
        return studentId;
    }

    public void setStudentId(int studentId) {
        this.studentId = studentId;
    }

    public int getRoomId() {
        return roomId;
    }

    public void setRoomId(int roomId) {
        this.roomId = roomId;
    }

    public Timestamp getAssignedDate() {
        return assignedDate;
    }

    public void setAssignedDate(Timestamp assignedDate) {
        this.assignedDate = assignedDate;
    }
}
