package com.universityHousing.backend_university_housing.dao.token;

import com.universityHousing.backend_university_housing.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TokenRepo extends JpaRepository<Token,Integer> {

    @Query("select t from Token t inner join User u on t.user.id = u.id where u.id = :userId and (t.expired = false or t.revoked = false)")
    List<Token>findAllValidTokenByUser(Integer userId);

    Optional<Token>findByToken(String token);
}
