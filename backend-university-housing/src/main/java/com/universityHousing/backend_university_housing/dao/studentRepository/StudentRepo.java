package com.universityHousing.backend_university_housing.dao.studentRepository;

import com.universityHousing.backend_university_housing.dto.StudentDTO;
import com.universityHousing.backend_university_housing.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StudentRepo extends JpaRepository<Student, Integer> {

    @Query("SELECT s.id as id,s.name AS name, s.email AS email, s.phone AS phone, s.gender AS gender,s.colleague AS colleague,s.stage AS stage, s.governorate AS governorate from Student s")
    List<Object[]> findStudentList();


    @Query("SELECT s.id as id,s.name AS name, s.email AS email, s.phone AS phone, s.gender AS gender,s.colleague AS colleague,s.stage AS stage, s.governorate AS governorate from Student s " +
            "JOIN Assignment a on s.id = a.student.id " +
            "WHERE a.rooms.id =:roomId")
    List<Object[]> findStudentsByRoomId(@Param("roomId") int roomId);

    Optional<Student> findStudentById(int id);
}
