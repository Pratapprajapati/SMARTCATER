package com.smartcater.smartcater_spring.Service;

import com.smartcater.smartcater_spring.Model.Order;
import com.smartcater.smartcater_spring.Repo.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public Order saveOrder(Order order) {
        try{
            if(order.getCity().isEmpty() || order.getCity().isBlank()){
                throw new RuntimeException("Please select city");
            }
            return orderRepository.save(order);
        }
        catch (Exception exception){
            throw exception;
        }

    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<Order> getOrdersByCustomerId(String customerId) {
        System.out.println("Fetching orders for customer ID: " + customerId);
        List<Order> orders = orderRepository.findByCustomerId(customerId);
        System.out.println("Orders found: " + orders);
        return orders;
    }
}