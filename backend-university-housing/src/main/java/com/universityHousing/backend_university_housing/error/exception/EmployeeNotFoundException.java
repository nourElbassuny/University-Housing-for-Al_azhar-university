package com.universityHousing.backend_university_housing.error.exception;

import java.sql.Timestamp;
public class EmployeeNotFoundException extends RuntimeException {
    Integer code = 657;
    String message = "Instructor not found";
    String description;
    Timestamp timestamp;

    public EmployeeNotFoundException(String description) {
        this.description = description;
        this.timestamp = new Timestamp(System.currentTimeMillis());
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }
}
