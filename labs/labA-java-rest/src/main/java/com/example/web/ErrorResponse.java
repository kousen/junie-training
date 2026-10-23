package com.example.web;

import java.time.Instant;

public record ErrorResponse(int status, String error, String message, String path, Instant timestamp) {
    public ErrorResponse {
        if (message == null || message.isBlank()) {
            message = "Unexpected error";
        }
        if (timestamp == null) {
            timestamp = Instant.now();
        }
    }
}
