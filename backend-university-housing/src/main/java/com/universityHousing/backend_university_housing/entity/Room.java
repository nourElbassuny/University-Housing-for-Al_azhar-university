package com.universityHousing.backend_university_housing.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Setter
@Getter
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


}
