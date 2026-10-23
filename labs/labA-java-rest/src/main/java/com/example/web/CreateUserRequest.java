package com.example.web;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record CreateUserRequest(
        @NotBlank(message = "Name must not be blank")
        String name,

        @NotBlank(message = "Email must not be blank")
        @Email(message = "Email must be a valid address")
        String email
) {
    public CreateUserRequest {
        name = name != null ? name.trim() : null;
        email = email != null ? email.trim().toLowerCase() : null;
    }
}
