package com.OrphanCompanion.Backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
public class BackendApplication {

	@CrossOrigin(origins = "${frontend.url}")
	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}
