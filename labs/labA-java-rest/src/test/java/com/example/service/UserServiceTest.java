package com.example.service;

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
}