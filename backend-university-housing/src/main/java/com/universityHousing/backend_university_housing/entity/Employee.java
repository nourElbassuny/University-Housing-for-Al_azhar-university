package com.universityHousing.backend_university_housing.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
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
    @Column(name = "email")
    private String email;
    public Employee() {}

    public Employee(String name, String job, String phone, String nationalId, String image,String email) {
        this.name = name;
        this.job = job;
        this.phone = phone;
        this.nationalId = nationalId;
        this.image = image;
        this.email = email;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getNationalId() {
        return nationalId;
    }

    public void setNationalId(String nationalId) {
        this.nationalId = nationalId;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
