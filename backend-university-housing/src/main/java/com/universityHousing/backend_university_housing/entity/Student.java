package com.universityHousing.backend_university_housing.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "students")
public class Student extends User {

    @Column(name = "arabic_name")
    private String arabicName;
    @Column(name = "english_name")
    private String englishName;
    @Column(name = "phone")
    private String phone;
    @Column (name = "gender")
    private String gender;
    @Column(name = "birthday")
    private Date birthday;
    @Column(name = "address")
    private String address;
    @Column(name = "colleague")
    private String colleague;
    @Column(name = "department")
    private String department;
    @Column(name = "grade")
    private String grade;
    @Column(name ="stage")
    private String stage;
    @Column(name = "Governorate")
    private String governorate;
    @Column(name = "state")
    private String state;
    @Column(name = "status")
    private String status;
    @Column(name = "national_id", length = 14)
    private String nationalId;
    @Lob
    @Column(name = "image")
    private byte[] image;

    @OneToMany(cascade = CascadeType.ALL,mappedBy="student")
    private List<Assignment> assignments;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "student_file_id")
    private StudentFile studentFile;

    @OneToMany(mappedBy = "student",cascade = CascadeType.ALL,orphanRemoval = true)
    @JsonIgnore
    private List<StudentAbsences>studentAbsences;
}
