package com.universityHousing.backend_university_housing.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "students")
public class Student {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "name")
    private String name;
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

    public Student() {}

    public Student(String name, String email, String phone, String gender, Date birthday, String city, String address, String colleague, String department, String grade, String stage, String governorate, String status, String nationalId, byte[] image,List<Assignment> assignments,StudentFile studentFile) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.gender = gender;
        this.birthday = birthday;
        this.city = city;
        this.address = address;
        this.colleague = colleague;
        this.department = department;
        this.grade = grade;
        this.stage = stage;
        this.governorate = governorate;
        this.status = status;
        this.nationalId = nationalId;
        this.image = image;
        this.assignments = assignments;
        this.studentFile=studentFile;
    }

    public StudentFile getStudentFile() {
        return studentFile;
    }

    public void setStudentFile(StudentFile studentFile) {
        this.studentFile = studentFile;
    }

    public List<Assignment> getAssignments() {
        return assignments;
    }

    public void setAssignments(List<Assignment> assignments) {
        this.assignments = assignments;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getColleague() {
        return colleague;
    }

    public void setColleague(String colleague) {
        this.colleague = colleague;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public String getStage() {
        return stage;
    }

    public void setStage(String stage) {
        this.stage = stage;
    }

    public String getGovernorate() {
        return governorate;
    }

    public void setGovernorate(String governorate) {
        this.governorate = governorate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getNationalId() {
        return nationalId;
    }

    public void setNationalId(String nationalId) {
        this.nationalId = nationalId;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
}
