package com.universityHousing.backend_university_housing.dao.studentRepository;

import com.universityHousing.backend_university_housing.entity.Student;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

import java.util.List;

public class StudentCustomRepoImpl implements StudentCustomRepo {
    @PersistenceContext
    private EntityManager em;


    @Override
    public List<Student> findStudentByRoomId(int roomId) {
        String sql="SELECT s.* from students s join assignments a on s.id=a.student_id where a.room_id=?";
        Query query=em.createNativeQuery(sql, Student.class)
                .setParameter(1,roomId);
        return query.getResultList();
    }
}
