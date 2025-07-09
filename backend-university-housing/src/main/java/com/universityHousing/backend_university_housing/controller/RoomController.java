package com.universityHousing.backend_university_housing.controller;

import com.universityHousing.backend_university_housing.dto.RoomDto;
import com.universityHousing.backend_university_housing.entity.Room;
import com.universityHousing.backend_university_housing.entity.Student;
import com.universityHousing.backend_university_housing.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api")
@RequiredArgsConstructor
public class RoomController {
    private final RoomService roomService;



    @GetMapping("/admin/rooms")
    public List<RoomDto> getAllRooms() {
        return roomService.getAllRooms();
    }

    @GetMapping("/student/non-full-room")
    public List<RoomDto> getAllNonFullRooms() {
        return roomService.getAllNonFullRooms();
    }

    @GetMapping("/admin/buildings/{buildingId}/rooms")
    public List<Room> getBuildingRooms(@PathVariable Integer buildingId) {
        return roomService.findRoomsByBuildingId(buildingId);
    }
}
