package com.example.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/**
 * Request DTO for creating a user.
 * Uses a compact constructor to normalize inputs (trim strings and lowercase emails).
 */
public record CreateUserRequest(
        @NotBlank(message = "Name is required") String name,
        @Email(message = "Valid email required") @NotBlank(message = "Email is required") String email
) {
    public CreateUserRequest {
        if (name != null) name = name.trim();
        if (email != null) email = email.trim().toLowerCase();
    }
}