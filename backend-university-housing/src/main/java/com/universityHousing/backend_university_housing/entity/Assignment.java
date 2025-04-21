package com.universityHousing.backend_university_housing.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import javax.xml.crypto.Data;
import java.sql.Timestamp;
import java.util.Date;

@Entity
@Table(name = "assignments")
public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "student_id",nullable = false)
    @JsonBackReference
    private Student student;
    @ManyToOne
    @JoinColumn(name = "room_id",nullable = false)
    private Room rooms;

    @Column(name = "assigned_date")
    private Timestamp assignedDate;

    public Assignment() {}
    public Assignment(Student student, Room room, Timestamp assignedDate) {
        this.student = student;
        this.rooms = room;
        this.assignedDate = assignedDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Room getRooms() {
        return rooms;
    }

    public void setRooms(Room rooms) {
        this.rooms = rooms;
    }

    public Timestamp getAssignedDate() {
        return assignedDate;
    }

    public void setAssignedDate(Timestamp assignedDate) {
        this.assignedDate = assignedDate;
    }
}
