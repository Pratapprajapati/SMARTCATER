package com.smartcater.smartcater_spring.Repo;

import com.smartcater.smartcater_spring.Model.Order;
import com.smartcater.smartcater_spring.Model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends MongoRepository<Order, String> {
    List<Order> findByCustomerId(String customerId);
}
