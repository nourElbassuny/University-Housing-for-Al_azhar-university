package com.universityHousing.backend_university_housing.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "employees")
public class Employee extends User {

    @Column(name = "name")
    private String name;
    @Column(name = "job")
    private String job;
    @Column(name = "phone")
    private String phone;
    @Column(name = "national_id")
    private String nationalId;
    @Column(name = "image")
    private String image;
    public Employee() {}

    public Employee(String name, String job, String phone, String nationalId, String image,String email) {
        this.name = name;
        this.job = job;
        this.phone = phone;
        this.nationalId = nationalId;
        this.image = image;

    }

}
