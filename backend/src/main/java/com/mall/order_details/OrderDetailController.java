package com.mall.order_details;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/order-details")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderDetailController {

    @Autowired
    private OrderDetailRepository repository;

    @Autowired
    private OrderDetailService service;

    @GetMapping
    public List<OrderDetail> getAllDetails() {
        return repository.findAll();
    }

    @PostMapping
    public OrderDetail addOrderDetail(@RequestBody OrderDetail detail) {
        return service.saveOrderDetail(detail);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDetail(@PathVariable("id") Long id) {
        return repository.findById(id).map(detail -> {
            repository.delete(detail);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/deliver")
    public OrderDetail markAsDelivered(@PathVariable("id") Long id) {
        OrderDetail detail = repository.findById(id).orElseThrow();
        detail.setStatus("Delivered");
        return repository.save(detail);
    }
}