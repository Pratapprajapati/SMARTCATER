package com.smartcater.smartcater_spring.Controller;

import com.smartcater.smartcater_spring.Model.ResponseDto;
import com.smartcater.smartcater_spring.Model.Order;
import com.smartcater.smartcater_spring.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST})
public class OrderController {

    private static final Logger logger = LoggerFactory.getLogger(OrderController.class);

    @Autowired
    private OrderService orderService;


    @PostMapping
    public ResponseDto<Order> createOrder(@RequestBody Order order) {
        ResponseDto<Order> responseDto = new ResponseDto<>();
        responseDto.setData(orderService.saveOrder(order));
        responseDto.setMessage("Order placed successfully");
        responseDto.setStatusCode(HttpStatus.OK.value());
        return responseDto;
    }


    @GetMapping
    public ResponseDto<List<Order>> getAllOrders() {
        ResponseDto response = new ResponseDto();
        response.setData(orderService.getAllOrders());
        response.setMessage("Order Retrieved successfully");
        response.setStatusCode(HttpStatus.OK.value());
        return response;
    }

    @GetMapping("/{customerId}")
    public ResponseDto<List<Order>> getOrdersByCustomerId(@PathVariable("customerId") String customerId) {
        ResponseDto<List<Order>> response = new ResponseDto<>();
        List<Order> orders = orderService.getOrdersByCustomerId(customerId);
        response.setData(orders);
        response.setMessage(orders.isEmpty() ? "No orders found" : "Orders retrieved successfully");
        response.setStatusCode(orders.isEmpty() ? HttpStatus.NOT_FOUND.value() : HttpStatus.OK.value());
        return response;
    }

}
