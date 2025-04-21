package com.universityHousing.backend_university_housing.controller;

import com.universityHousing.backend_university_housing.dto.RoomDto;
import com.universityHousing.backend_university_housing.entity.Room;
import com.universityHousing.backend_university_housing.entity.Student;
import com.universityHousing.backend_university_housing.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api")
public class RoomController {
    private final RoomService roomService;

    @Autowired
    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping("/rooms")
    public List<RoomDto> getAllRooms() {
        return roomService.getAllRooms();
    }

    @GetMapping("/buildings/{buildingId}/rooms")
    public List<Room> getBuildingRooms(@PathVariable Integer buildingId) {
        return roomService.findRoomsByBuildingId(buildingId);
    }
}
