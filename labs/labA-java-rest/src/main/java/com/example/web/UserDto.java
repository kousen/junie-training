package com.example.web;

public record UserDto(Long id, String name, String email) {
    public UserDto {
        if (id == null || id <= 0) {
            throw new IllegalArgumentException("User id must be positive");
        }
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Name must not be blank");
        }
        if (email == null || email.isBlank() || !email.contains("@")) {
            throw new IllegalArgumentException("Email must be a valid address");
        }
        name = name.trim();
        email = email.trim().toLowerCase();
    }
}
