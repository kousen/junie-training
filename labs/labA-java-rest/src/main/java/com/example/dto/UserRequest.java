package com.example.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserRequest(
        @NotBlank(message = "Name is required and cannot be blank")
        String name,
        @NotBlank(message = "Email is required and cannot be blank")
        @Email(message = "Email must be valid")
        String email
) {
}
