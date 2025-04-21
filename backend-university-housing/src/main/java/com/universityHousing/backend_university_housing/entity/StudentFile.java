package com.universityHousing.backend_university_housing.entity;

import jakarta.persistence.*;

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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public byte[] getFileData() {
        return fileData;
    }

    public void setFileData(byte[] fileData) {
        this.fileData = fileData;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }
}
