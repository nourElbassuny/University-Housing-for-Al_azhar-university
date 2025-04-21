package com.universityHousing.backend_university_housing.dto;

import java.util.Date;

public class StudentDTO {
    private int id;
    private String name;
    private String email;
    private String phone;
    private String gender;
    private Date birthday;
    private String city;
    private String address;
    private String colleague;
    private String department;
    private String grade;
    private String stage;
    private String governorate;
    private String status;
    private String nationalId;
//    private byte[] image;

    public StudentDTO(int id, String name, String email, String phone, String gender, Date birthday, String city, String address, String colleague, String department, String grade, String stage, String governorate, String status, String nationalId) {
        this.id = id;
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

    }
    public StudentDTO(int id, String name, String email, String phone, String gender,    String governorate) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.gender = gender;
        this.governorate = governorate;
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


}
