
package com.portfolio.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import com.portfolio.backend.repository.UserRepository;
import com.portfolio.backend.model.User;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class BackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    public CommandLineRunner initData(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.findByUsername("admin").isEmpty()) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword(passwordEncoder.encode("mouli@123"));
                admin.setRole("ADMIN");
                userRepository.save(admin);
                System.out.println("Default admin user created: admin / mouli@123");
            } else {
                userRepository.findByUsername("admin").ifPresent(admin -> {
                    admin.setPassword(passwordEncoder.encode("mouli@123"));
                    userRepository.save(admin);
                    System.out.println("Admin password updated to: mouli@123");
                });
            }
        };
    }
}
