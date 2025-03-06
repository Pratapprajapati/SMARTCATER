package com.smartcater.smartcater_spring.Model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "delivery")

public class Delivery {
    private String house;
    private String town;
    private String city;
    private String pinCode;


    public String getHouse() {
        return house;
    }

    public void setHouse(String house) {
        this.house = house;
    }

    public String getTown() {
        return town;
    }

    public void setTown(String town) {
        this.town = town;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPinCode() {
        return pinCode;
    }

    public void setPinCode(String pinCode) {
        this.pinCode = pinCode;
    }
}

