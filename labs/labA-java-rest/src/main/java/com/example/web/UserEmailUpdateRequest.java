package com.example.web;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserEmailUpdateRequest(
        @NotBlank(message = "Email is required and cannot be blank")
        @Email(message = "Email must be valid")
        String email
) {
    public UserEmailUpdateRequest {
        email = email == null ? null : email.trim().toLowerCase();
    }
}