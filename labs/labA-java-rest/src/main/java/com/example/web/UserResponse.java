package com.example.web;

public record UserResponse(Long id, String name, String email) {
    public UserResponse {
        name = name == null ? null : name.trim();
        email = email == null ? null : email.trim().toLowerCase();
    }
}
