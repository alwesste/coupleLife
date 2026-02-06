package com.project.coupleLife.DTOS;

import com.project.coupleLife.enums.TransactionCategory;

import java.util.Date;

public class PurchaseDTO {
    private Long id;
    private Date date;
    private TransactionCategory purchaseType;
    private String comment;
    private Double amount;

    public PurchaseDTO(Long id, Date date, Double amount, String comment, TransactionCategory purchaseType) {
        this.id = id;
        this.date = date;
        this.amount = amount;
        this.comment = comment;
        this.purchaseType = purchaseType;
    }

    public PurchaseDTO() {

    }

    public Long getId() { return id;}

    public void setId(Long id) { this.id = id; }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public TransactionCategory getPurchaseType() {
        return purchaseType;
    }

    public void setPurchaseType(TransactionCategory purchaseType) {
        this.purchaseType = purchaseType;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
