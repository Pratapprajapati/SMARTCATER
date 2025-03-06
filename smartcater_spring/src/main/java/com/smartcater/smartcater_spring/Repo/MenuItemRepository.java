package com.smartcater.smartcater_spring.Repo;

import com.smartcater.smartcater_spring.Model.MenuItem;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MenuItemRepository extends MongoRepository<MenuItem, String> {
}