package com.universityHousing.backend_university_housing.dao.studentFiles;

import com.universityHousing.backend_university_housing.entity.StudentFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentFileRepository extends JpaRepository<StudentFile,Integer> {

}
