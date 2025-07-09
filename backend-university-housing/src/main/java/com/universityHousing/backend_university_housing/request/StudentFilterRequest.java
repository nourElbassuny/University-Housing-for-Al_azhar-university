package com.universityHousing.backend_university_housing.request;

import lombok.Data;

@Data
public class StudentFilterRequest {
    private String search;
    private String governorate;
    private String grade;
    private String status;
    private String colleague;
}
