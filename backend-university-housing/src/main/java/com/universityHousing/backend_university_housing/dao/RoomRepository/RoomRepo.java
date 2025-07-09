package com.universityHousing.backend_university_housing.dao.RoomRepository;

import com.universityHousing.backend_university_housing.dto.RoomDto;
import com.universityHousing.backend_university_housing.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface RoomRepo extends JpaRepository<Room, Integer> {
    List<Room> findRoomsByBuildingId(Integer buildingId);

    @Query("select new com.universityHousing.backend_university_housing.dto.RoomDto(r.id,r.roomNumber,r.capacity,r.currentCapacity,r.building.name) from Room r where r.currentCapacity<r.capacity")
    List<RoomDto> getAllNonFullRooms();
}
