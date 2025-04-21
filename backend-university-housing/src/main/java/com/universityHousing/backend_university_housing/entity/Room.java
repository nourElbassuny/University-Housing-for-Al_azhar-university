package com.universityHousing.backend_university_housing.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id;
    @Column(name = "room_number")
    private String roomNumber;

    @Column(name = "capacity")
    private int capacity;

    @Column(name = "current_capacity")
    private int currentCapacity;

    @ManyToOne
    @JoinColumn(name = "building_id",nullable = false)
    @JsonBackReference
    private Building building;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "rooms")
    private List<Assignment> room;
    public Room() {
    }

    public Room(String roomNumber, int capacity, int currentCapacity, Building building, List<Assignment> room) {
        this.roomNumber = roomNumber;
        this.capacity = capacity;
        this.currentCapacity = currentCapacity;
        this.building = building;
        this.room = room;
    }

    public List<Assignment> getRoom() {
        return room;
    }

    public void setRoom(List<Assignment> room) {
        this.room = room;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public int getCurrentCapacity() {
        return currentCapacity;
    }

    public void setCurrentCapacity(int currentCapacity) {
        this.currentCapacity = currentCapacity;
    }

    public Building getBuilding() {
        return building;
    }

    public void setBuilding(Building building) {
        this.building = building;
    }
}
