package com.universityHousing.backend_university_housing.dto;

import java.time.LocalDate;

public record StudentAbsencesDTO(int id, LocalDate startDate,LocalDate endDate,String reason) {
}
