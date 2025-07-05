package com.universityHousing.backend_university_housing.dao.studentRepository;

import com.universityHousing.backend_university_housing.dto.StudentDTO;
import com.universityHousing.backend_university_housing.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StudentRepo extends JpaRepository<Student, Integer> {


    @Query("SELECT new com.universityHousing.backend_university_housing.dto.StudentDTO(" +
            "s.id,s.email,s.arabicName,s.englishName,s.phone,s.gender,s.birthday,s.state,s.address,s.colleague,s.department,s.grade,s.stage,s.governorate,s.status,s.nationalId)" +
            " from Student s")
    Page<StudentDTO>findAllStudent(Pageable pageable);


    @Query("SELECT new com.universityHousing.backend_university_housing.dto.StudentDTO( s.id,s.email,s.arabicName,s.englishName,s.phone,s.gender,s.colleague,s.stage,s.governorate) " +
            "from Student s JOIN Assignment a on s.id = a.student.id "+
            "where a.rooms.id =:roomId")
//    @Query("SELECT s.id as id,s.arabicName AS name, s.email AS email, s.phone AS phone, s.gender AS gender,s.colleague AS colleague,s.stage AS stage, s.governorate AS governorate from Student s " +
//            "JOIN Assignment a on s.id = a.student.id " +
//            "WHERE a.rooms.id =:roomId")
    Optional<List<StudentDTO>> findStudentsByRoomId(@Param("roomId") int roomId);

    @Query("SELECT new com.universityHousing.backend_university_housing.dto.StudentDTO(" +
            "s.id,s.email,s.arabicName,s.englishName,s.phone,s.gender,s.birthday,s.state,s.address,s.colleague,s.department,s.grade,s.stage,s.governorate,s.status,s.nationalId)" +
            " from Student s where s.id =:id")
    Optional<StudentDTO> findStudent(@Param("id") int id);

    Optional<Student> findStudentById(int id);

    @Query("select s.image from Student s where s.id =:id")
    Optional<byte[]> findStudentImageById(@Param("id") int id);
}
