package com.example.web.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateUserRequest(
        @NotBlank @Size(max = 50) String name,
        @NotBlank @Email @Size(max = 100) String email
) {
    public CreateUserRequest {
        if (name != null) name = name.trim();
        if (email != null) email = email.trim().toLowerCase();
    }
}
