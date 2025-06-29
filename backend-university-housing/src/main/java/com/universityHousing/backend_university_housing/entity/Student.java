package com.universityHousing.backend_university_housing.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "students")
public class Student extends User {

    @Column(name = "arabic_name")
    private String arabicName;
    @Column(name = "english_name")
    private String englishName;
    @Column(name = "email")
    private String email;
    @Column(name = "phone")
    private String phone;
    @Column (name = "gender")
    private String gender;
    @Column(name = "birthday")
    private Date birthday;
    @Column(name = "city")
    private String city;
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
    @Column(name = "status")

    private String status;
    @Column(name = "national_id", length = 14)
    private String nationalId;
    @Lob
    @Column(name = "image")
    private byte[] image;

    @OneToMany(cascade = CascadeType.ALL,mappedBy="student")
   @JsonBackReference
    private List<Assignment> assignments;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "student_file_id")
    private StudentFile studentFile;



}
