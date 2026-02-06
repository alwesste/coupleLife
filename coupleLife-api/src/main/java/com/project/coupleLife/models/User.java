package com.project.coupleLife.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstname;
    private String name;
    private String email;
    private Double balance;
    private Double salary;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
    private List<Purchase> purchases;

    public User( Long id, Double salary, Double balance, String email, String name, String firstname, List<Purchase> purchases) {
        this.id = id;
        this.salary = salary;
        this.balance = balance;
        this.email = email;
        this.name = name;
        this.firstname = firstname;
        this.purchases = purchases;
    }


    public User() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }
}

