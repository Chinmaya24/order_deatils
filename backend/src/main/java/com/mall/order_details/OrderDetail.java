package com.mall.order_details;

import jakarta.persistence.*;
import java.math.BigDecimal;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "order_details")
public class OrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("order_detail_id") // Forces the JSON to use underscores
    private Long order_detail_id;

    private Integer order_id;
    private Integer item_id;
    private Integer quantity;
    private BigDecimal unit_price;
    private BigDecimal subtotal;
    private String status = "Ordered";

    // Getters and Setters
    public Long getOrder_detail_id() { return order_detail_id; }
    public void setOrder_detail_id(Long order_detail_id) { this.order_detail_id = order_detail_id; }
    public Integer getOrder_id() { return order_id; }
    public void setOrder_id(Integer order_id) { this.order_id = order_id; }
    public Integer getItem_id() { return item_id; }
    public void setItem_id(Integer item_id) { this.item_id = item_id; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public BigDecimal getUnit_price() { return unit_price; }
    public void setUnit_price(BigDecimal unit_price) { this.unit_price = unit_price; }
    public BigDecimal getSubtotal() { return subtotal; }
    public void setSubtotal(BigDecimal subtotal) { this.subtotal = subtotal; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}