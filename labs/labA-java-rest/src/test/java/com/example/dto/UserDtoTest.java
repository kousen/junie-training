package com.example.dto;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class UserDtoTest {

    @Test
    void normalizesNameAndEmail() {
        UserDto user = new UserDto(1L, "  Alice Smith  ", "  ALICE@Example.com  ");

        assertThat(user.name()).isEqualTo("Alice Smith");
        assertThat(user.email()).isEqualTo("alice@example.com");
    }

    @Test
    void rejectsInvalidIds() {
        assertThatThrownBy(() -> new UserDto(null, "Alice", "alice@example.com"))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("User id must be positive");
        assertThatThrownBy(() -> new UserDto(0L, "Alice", "alice@example.com"))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("User id must be positive");
    }

    @Test
    void rejectsBlankNames() {
        assertThatThrownBy(() -> new UserDto(1L, null, "alice@example.com"))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Name must not be blank");
        assertThatThrownBy(() -> new UserDto(1L, "   ", "alice@example.com"))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Name must not be blank");
    }

    @Test
    void rejectsInvalidEmails() {
        assertThatThrownBy(() -> new UserDto(1L, "Alice", null))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Email must be a valid address");
        assertThatThrownBy(() -> new UserDto(1L, "Alice", "   "))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Email must be a valid address");
        assertThatThrownBy(() -> new UserDto(1L, "Alice", "invalid-email"))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Email must be a valid address");
    }
}