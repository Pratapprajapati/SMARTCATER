package com.smartcater.smartcater_spring.Service;

import com.smartcater.smartcater_spring.Model.Customer;
import com.smartcater.smartcater_spring.Repo.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public Customer saveCustomer(Customer customer) {
        System.out.println("Saving customer: " + customer); // Debug statement
        return customerRepository.save(customer);
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer getCustomerById(String id) {
        return customerRepository.findById(id).orElse(null);
    }

    public void deleteCustomer(String id) {
        customerRepository.deleteById(id);
    }


}