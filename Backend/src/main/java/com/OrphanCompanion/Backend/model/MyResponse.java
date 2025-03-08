package com.OrphanCompanion.Backend.model;



//Represents the database entities or domain objects.


public class MyResponse {
    private String message;

    // Constructor
    public MyResponse(String message) {
        this.message = message;
    }

    // Getter and setter for message
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}

