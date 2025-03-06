package com.smartcater.smartcater_spring.Model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "customers")
public class Customer {
    private String name;
    private String id;
    private String whatsapp;
    private String email;
    private String password;

























    public Customer() {
        // No-argument constructor required by Jackson
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() { return id; }

    public void setId(String id) { this.id = id; }

    public String getWhatsapp() {
        return whatsapp;
    }

    public void setWhatsapp(String whatsapp) {
        this.whatsapp = whatsapp;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

   }
