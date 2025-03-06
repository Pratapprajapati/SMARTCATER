package com.smartcater.smartcater_spring.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document(collection = "orders")
public class Order {
    @Id
    private String id;
    @Field("customer_id") // Explicitly map field to match MongoDB
    private String customerId;
    private String city;
    private String occasion;
    private String eventDate;
    private String deliveryTime;
    private int guestCount;
    private String boxtype;
    private List<MenuItem> starterList;
    private List<MenuItem> starterSalad;
    private List<MenuItem> mainsList;
    private List<MenuItem> breadsList;
    private List<MenuItem> breadList;
    private List<MenuItem> riceList;
    private List<MenuItem> dalList;
    private List<MenuItem> dessertList;
    private List<MenuItem> liveserviceList;
    private Customer customer;
    private double totalPrice;
    private Delivery delivery;

    // Getters and Setters


    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getOccasion() {
        return occasion;
    }

    public void setOccasion(String occasion) {
        this.occasion = occasion;
    }

    public String getEventDate() {
        return eventDate;
    }

    public void setEventDate(String eventDate) {
        this.eventDate = eventDate;
    }

    public String getDeliveryTime() {
        return deliveryTime;
    }

    public void setDeliveryTime(String deliveryTime) {
        this.deliveryTime = deliveryTime;
    }

    public int getGuestCount() {
        return guestCount;
    }

    public void setGuestCount(int guestCount) {
        this.guestCount = guestCount;
    }

    public List<MenuItem> getStarterList() {
        return starterList;
    }

    public void setStarterList(List<MenuItem> starterList) {
        this.starterList = starterList;
    }

    public List<MenuItem> getStarterSalad() {
        return starterSalad;
    }

    public void setStarterSalad(List<MenuItem> starterSalad) {
        this.starterSalad = starterSalad;
    }

    public List<MenuItem> getMainsList() {
        return mainsList;
    }

    public void setMainsList(List<MenuItem> mainsList) {
        this.mainsList = mainsList;
    }


    public List<MenuItem> getBreadsList() {
        return breadsList;
    }

    public void setBreadsList(List<MenuItem> breadsList) {
        this.breadsList = breadsList;
    }

    public List<MenuItem> getBreadList() {
        return breadList;
    }

    public void setBreadList(List<MenuItem> breadList) {
        this.breadList = breadList;
    }

    public List<MenuItem> getRiceList() {
        return riceList;
    }

    public void setRiceList(List<MenuItem> riceList) {
        this.riceList = riceList;
    }

    public List<MenuItem> getDalList() {
        return dalList;
    }

    public void setDalList(List<MenuItem> dalList) {
        this.dalList = dalList;
    }

    public List<MenuItem> getDessertList() {
        return dessertList;
    }

    public void setDessertList(List<MenuItem> dessertList) {
        this.dessertList = dessertList;
    }

    public List<MenuItem> getLiveserviceList() {
        return liveserviceList;
    }

    public void setLiveserviceList(List<MenuItem> liveserviceList) {
        this.liveserviceList = liveserviceList;
    }


    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public double getTotalPrice() {  // Getter for totalPrice
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {  // Setter for totalPrice
        this.totalPrice = totalPrice;
    }

    public Delivery getDelivery() {
        return delivery;
    }

    public void setDelivery(Delivery delivery) {
        this.delivery = delivery;
    }

    public String getBoxtype() {
        return boxtype;
    }

    public void setBoxtype(String boxtype) {
        this.boxtype = boxtype;
    }
    //Other getters and setters...
}

