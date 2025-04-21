package com.universityHousing.backend_university_housing.dto;

public class RoomDto {
    private int id;
    private String roomNumber;
    private int capacity;
    private int currentCapacity;
    private String buildingName;

    public RoomDto(int id, String roomNumber, int capacity, int currentCapacity, String buildingName) {
        this.id = id;
        this.roomNumber = roomNumber;
        this.capacity = capacity;
        this.currentCapacity = currentCapacity;
        this.buildingName = buildingName;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public int getCurrentCapacity() {
        return currentCapacity;
    }

    public void setCurrentCapacity(int currentCapacity) {
        this.currentCapacity = currentCapacity;
    }

    public String getBuildingName() {
        return buildingName;
    }

    public void setBuildingName(String buildingName) {
        this.buildingName = buildingName;
    }
}
