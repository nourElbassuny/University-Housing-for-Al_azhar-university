package com.universityHousing.backend_university_housing.dao.studentRepository;

import com.universityHousing.backend_university_housing.dto.StudentDTO;
import com.universityHousing.backend_university_housing.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface StudentRepo extends JpaRepository<Student, Integer> {


    @Query("SELECT new com.universityHousing.backend_university_housing.dto.StudentDTO(" +
            "s.id,s.email,s.arabicName,s.englishName,s.phone,s.gender,s.birthday,s.state,s.address,s.colleague,s.department,s.grade,s.stage,s.governorate,s.status,s.nationalId)" +
            " from Student s where s.status is not null ")
    Page<StudentDTO>findAllStudent(Pageable pageable);

    @Query("""
    SELECT new com.universityHousing.backend_university_housing.dto.StudentDTO(
        s.id, s.email, s.arabicName, s.englishName, s.phone, s.gender,
        s.birthday, s.state, s.address, s.colleague, s.department,
        s.grade, s.stage, s.governorate, s.status, s.nationalId)
    FROM Student s
    WHERE (:colleague IS NULL OR s.colleague = :colleague)
      AND (:governorate IS NULL OR s.governorate = :governorate)
      AND (:grade IS NULL OR s.grade = :grade)
      AND (:status IS NULL OR s.status = :status)
      AND (
        :search IS NULL OR
         LOWER(s.arabicName) LIKE (CONCAT('%', :search, '%')) OR
        LOWER(s.englishName) LIKE LOWER(CONCAT('%', :search, '%')) OR
        LOWER(s.email) LIKE LOWER(CONCAT('%', :search, '%')) OR
        s.nationalId LIKE CONCAT('%', :search, '%') OR
        s.phone LIKE CONCAT('%', :search, '%')
      )
""")
    Page<StudentDTO>findStudentWithFilter(
            @Param("colleague") String colleague,
            @Param("governorate") String governorate,
            @Param("grade") String grade,
            @Param("status") String status,
            @Param("search") String search,
            Pageable pageable);


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


    @Query("SELECT COUNT(s) FROM Student s WHERE " +
            "s.status = 'مقبول' AND NOT EXISTS (SELECT a FROM StudentAbsences a WHERE a.student = s AND :date BETWEEN a.startDate AND a.endDate)")
    Integer countPresentStudents(@Param("date") LocalDate date);

}
