package com.mall.order_details;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;

@Service
public class OrderDetailService {

    @Autowired
    private OrderDetailRepository repository;

    public OrderDetail saveOrderDetail(OrderDetail detail) {
        if (detail.getQuantity() != null && detail.getUnit_price() != null) {
            BigDecimal qty = new BigDecimal(detail.getQuantity());
            detail.setSubtotal(detail.getUnit_price().multiply(qty));
        }
        return repository.save(detail);
    }
}