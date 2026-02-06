package com.project.coupleLife.models;

import com.project.coupleLife.enums.TransactionCategory;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "purchase")
public class Purchase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "date")
    private Date date;

    @Column(name = "purchase_type")
    @Enumerated(EnumType.STRING)
    private TransactionCategory purchaseType;

    private String comment;

    private Double amount;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Purchase(Long id, Date date, TransactionCategory purchaseType, String comment, Double amount, User user) {
        this.id = id;
        this.date = date;
        this.purchaseType = purchaseType;
        this.comment = comment;
        this.amount = amount;
        this.user = user;
    }

    public Purchase() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public TransactionCategory getPurchaseType() {
        return purchaseType;
    }

    public void setPurchaseType(TransactionCategory purchaseType) {
        this.purchaseType = purchaseType;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
