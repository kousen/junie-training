package com.example.service;

import com.example.web.UserEmailUpdateRequest;
import com.example.web.UserRequest;
import com.example.web.UserResponse;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class UserServiceTest {
    private final UserService userService = new UserService();

    @Test
    void createUserAssignsIncrementingIds() {
        UserResponse first = userService.createUser(new UserRequest("Jane Doe", "jane@example.com"));
        UserResponse second = userService.createUser(new UserRequest("John Doe", "john@example.com"));

        assertThat(first.id()).isEqualTo(1L);
        assertThat(second.id()).isEqualTo(2L);
    }

    @Test
    void createUserStoresCreatedUser() {
        UserResponse created = userService.createUser(new UserRequest("Jane Doe", "jane@example.com"));

        assertThat(userService.getUserById(created.id()))
                .contains(created);
    }

    @Test
    void getUserByIdReturnsEmptyWhenMissing() {
        assertThat(userService.getUserById(99L)).isEmpty();
    }

    @Test
    void getAllUsersReturnsUsersSortedById() {
        UserResponse first = userService.createUser(new UserRequest("Jane Doe", "jane@example.com"));
        UserResponse second = userService.createUser(new UserRequest("John Doe", "john@example.com"));

        assertThat(userService.getAllUsers())
                .containsExactly(first, second);
    }

    @Test
    void createUserNormalizesNameAndEmail() {
        UserResponse created = userService.createUser(new UserRequest("  Jane Doe  ", "  JANE@EXAMPLE.COM  "));

        assertThat(created.name()).isEqualTo("Jane Doe");
        assertThat(created.email()).isEqualTo("jane@example.com");
    }

    @Test
    void updateUserEmailUpdatesOnlyEmail() {
        UserResponse created = userService.createUser(new UserRequest("Jane Doe", "jane@example.com"));

        UserResponse updated = userService.updateUserEmail(created.id(), new UserEmailUpdateRequest("new@example.com"))
                .orElseThrow();

        assertThat(updated.id()).isEqualTo(created.id());
        assertThat(updated.name()).isEqualTo("Jane Doe");
        assertThat(updated.email()).isEqualTo("new@example.com");
    }

    @Test
    void updateUserEmailNormalizesEmail() {
        UserResponse created = userService.createUser(new UserRequest("Jane Doe", "jane@example.com"));

        UserResponse updated = userService.updateUserEmail(created.id(), new UserEmailUpdateRequest("  NEW@EXAMPLE.COM  "))
                .orElseThrow();

        assertThat(updated.email()).isEqualTo("new@example.com");
    }

    @Test
    void updateUserEmailReturnsEmptyWhenMissing() {
        assertThat(userService.updateUserEmail(99L, new UserEmailUpdateRequest("new@example.com")))
                .isEmpty();
    }
}