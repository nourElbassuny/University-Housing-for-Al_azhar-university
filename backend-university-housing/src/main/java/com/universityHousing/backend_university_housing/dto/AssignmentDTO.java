package com.universityHousing.backend_university_housing.dto;


import java.sql.Timestamp;

public record AssignmentDTO (int id, int studentId, int roomId, Timestamp assignedDate){ }
