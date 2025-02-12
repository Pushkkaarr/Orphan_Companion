package com.OrphanCompanion.Backend.controller;

import com.OrphanCompanion.Backend.model.MyResponse;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "${frontend.url}")
public class AvatarController {

    @GetMapping("/demo")
    public MyResponse demo(){
        System.out.println("hello world");

        // Create a response object
        MyResponse response = new MyResponse("Hello from backend!");

        // Return the response (Spring will automatically convert it to JSON)
        return response;
    }
}
