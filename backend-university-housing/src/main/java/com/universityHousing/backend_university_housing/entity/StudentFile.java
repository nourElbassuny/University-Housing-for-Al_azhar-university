package com.universityHousing.backend_university_housing.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "studentfiles")
public class StudentFile {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "file_data")
    @Lob
    private byte[] fileData;

    @OneToOne(cascade = CascadeType.ALL,mappedBy = "studentFile")
    private Student student;

    public StudentFile(){}

    public StudentFile(byte[] fileData, Student student) {
        this.fileData = fileData;
        this.student = student;
    }

}
