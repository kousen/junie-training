package com.example.web;

import org.junit.jupiter.api.Test;

import java.time.Instant;

import static org.assertj.core.api.Assertions.assertThat;

class ErrorResponseTest {

    @Test
    void defaultsMissingMessageAndTimestamp() {
        ErrorResponse error = new ErrorResponse(400, "Bad Request", null, "/api/users", null);

        assertThat(error.message()).isEqualTo("Unexpected error");
        assertThat(error.timestamp()).isNotNull();
    }

    @Test
    void defaultsBlankMessageAndPreservesTimestamp() {
        Instant timestamp = Instant.parse("2026-01-01T00:00:00Z");

        ErrorResponse error = new ErrorResponse(400, "Bad Request", "   ", "/api/users", timestamp);

        assertThat(error.message()).isEqualTo("Unexpected error");
        assertThat(error.timestamp()).isEqualTo(timestamp);
    }
}