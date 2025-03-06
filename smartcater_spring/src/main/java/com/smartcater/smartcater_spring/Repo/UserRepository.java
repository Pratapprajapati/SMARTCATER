package com.smartcater.smartcater_spring.Repo;


import com.smartcater.smartcater_spring.Model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    User findUserById(String id);

}