package com.universityHousing.backend_university_housing.service;

import com.universityHousing.backend_university_housing.dao.RoomRepository.RoomRepo;
import com.universityHousing.backend_university_housing.dto.RoomDto;
import com.universityHousing.backend_university_housing.entity.Room;
import com.universityHousing.backend_university_housing.entity.Student;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoomService {
    @PersistenceContext
    private EntityManager entityManager;

    private RoomRepo roomRepo;
    @Autowired
    public RoomService(RoomRepo roomRepo) {
        this.roomRepo = roomRepo;
    }
    public List<RoomDto> getAllRooms() {
       List<Room> rooms = roomRepo.findAll();
       return rooms.stream().map(room -> new RoomDto(
               room.getId(),
               room.getRoomNumber(),
               room.getCapacity(),
               room.getCurrentCapacity(),
               room.getBuilding().getName()
       ))
               .collect(Collectors.toList());
    }
    public List<Room>findRoomsByBuildingId(int buildingId) {
        return roomRepo.findRoomsByBuildingId(buildingId);
    }

}
