package com.universityHousing.backend_university_housing.dao.studentRepository;

import com.universityHousing.backend_university_housing.entity.Student;

import java.util.List;

public interface StudentCustomRepo {
    List<Student> findStudentByRoomId(int roomId);
}
