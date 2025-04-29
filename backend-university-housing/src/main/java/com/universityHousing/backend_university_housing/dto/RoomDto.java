package com.universityHousing.backend_university_housing.dto;

public record RoomDto(int id, String roomNumber, int capacity, int currentCapacity, String buildingName) {
}
