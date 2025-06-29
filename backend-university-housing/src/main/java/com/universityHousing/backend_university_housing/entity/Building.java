package com.universityHousing.backend_university_housing.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Setter
@Getter
@Entity
@Table(name ="buildings" )
public class Building {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;


    @OneToMany(cascade = CascadeType.ALL,mappedBy = "building")
    @JsonBackReference //without this the output in postman if very bad
    private Set<Room> rooms;



    public Building() {
    }
    public Building(String name) {
        this.name = name;
    }

}
