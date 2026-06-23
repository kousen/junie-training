package com.example.web;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserRequest(
        @NotBlank(message = "Name is required and cannot be blank")
        String name,
        @NotBlank(message = "Email is required and cannot be blank")
        @Email(message = "Email must be valid")
        String email
) {
    public UserRequest {
        name = name == null ? null : name.trim();
        email = email == null ? null : email.trim().toLowerCase();
    }
}
