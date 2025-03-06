package com.smartcater.smartcater_spring.Repo;

import com.smartcater.smartcater_spring.Model.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CustomerRepository extends MongoRepository<Customer, String> {
}