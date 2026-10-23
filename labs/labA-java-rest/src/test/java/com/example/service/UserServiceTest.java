package com.example.service;

import com.example.dto.CreateUserRequest;
import com.example.dto.UserDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class UserServiceTest {

    private UserService userService;

    @BeforeEach
    void setUp() {
        userService = new UserService();
    }

    @Test
    void createRejectsNullRequest() {
        assertThatThrownBy(() -> userService.create(null))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("CreateUserRequest must not be null");
    }

    @Test
    void updateRejectsNullRequest() {
        assertThatThrownBy(() -> userService.update(1L, null))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("CreateUserRequest must not be null");
    }

    @Test
    void createAndRetrieveUsers() {
        assertThat(userService.findAll()).isEmpty();

        UserDto created = userService.create(new CreateUserRequest("  Bob Jones ", " BOB@example.com "));

        assertThat(created.id()).isEqualTo(1L);
        assertThat(created.name()).isEqualTo("Bob Jones");
        assertThat(created.email()).isEqualTo("bob@example.com");

        List<UserDto> allUsers = userService.findAll();
        assertThat(allUsers).containsExactly(created);
        assertThat(userService.findById(1L)).isEqualTo(created);
    }

    @Test
    void findByIdThrowsWhenUserDoesNotExist() {
        assertThatThrownBy(() -> userService.findById(99L))
                .isInstanceOf(UserNotFoundException.class)
                .hasMessage("User not found with id: 99");
    }

    @Test
    void updateReplacesAnExistingUser() {
        userService.create(new CreateUserRequest("Alice Smith", "alice@example.com"));

        UserDto updated = userService.update(1L,
                new CreateUserRequest("  Alice Jones  ", "  ALICE@EXAMPLE.ORG  "));

        assertThat(updated).isEqualTo(new UserDto(1L, "Alice Jones", "alice@example.org"));
        assertThat(userService.findById(1L)).isEqualTo(updated);
        assertThat(userService.findAll()).containsExactly(updated);
    }

    @Test
    void updateThrowsWhenUserDoesNotExist() {
        assertThatThrownBy(() -> userService.update(99L,
                new CreateUserRequest("Alice", "alice@example.com")))
                .isInstanceOf(UserNotFoundException.class)
                .hasMessage("User not found with id: 99");
    }

    @Test
    void deleteRemovesAnExistingUser() {
        userService.create(new CreateUserRequest("Alice", "alice@example.com"));

        userService.delete(1L);

        assertThat(userService.findAll()).isEmpty();
        assertThatThrownBy(() -> userService.findById(1L))
                .isInstanceOf(UserNotFoundException.class)
                .hasMessage("User not found with id: 1");
    }

    @Test
    void deleteThrowsWhenUserDoesNotExist() {
        assertThatThrownBy(() -> userService.delete(99L))
                .isInstanceOf(UserNotFoundException.class)
                .hasMessage("User not found with id: 99");
    }
}
