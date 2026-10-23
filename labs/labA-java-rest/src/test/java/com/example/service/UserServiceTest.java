package com.example.service;

import com.example.web.CreateUserRequest;
import com.example.web.UserDto;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class UserServiceTest {

    private static ValidatorFactory validatorFactory;
    private static Validator validator;

    private UserService userService;

    @BeforeAll
    static void setUpValidator() {
        validatorFactory = Validation.buildDefaultValidatorFactory();
        validator = validatorFactory.getValidator();
    }

    @AfterAll
    static void closeValidator() {
        validatorFactory.close();
    }

    @BeforeEach
    void setUp() {
        userService = new UserService();
    }

    @Test
    void createUserRequestNormalizesAndValidatesFields() {
        CreateUserRequest request = new CreateUserRequest("  Alice Smith  ", "  ALICE@Example.com  ");

        assertThat(request.name()).isEqualTo("Alice Smith");
        assertThat(request.email()).isEqualTo("alice@example.com");
        assertThat(validator.validate(request)).isEmpty();
    }

    @Test
    void createUserRequestRejectsInvalidInputViaBeanValidation() {
        Set<ConstraintViolation<CreateUserRequest>> blankNameViolations =
                validator.validate(new CreateUserRequest("   ", "alice@example.com"));
        assertThat(blankNameViolations)
                .extracting(ConstraintViolation::getMessage)
                .containsExactly("Name must not be blank");

        Set<ConstraintViolation<CreateUserRequest>> invalidEmailViolations =
                validator.validate(new CreateUserRequest("Alice", "invalid-email"));
        assertThat(invalidEmailViolations)
                .extracting(ConstraintViolation::getMessage)
                .containsExactly("Email must be a valid address");
    }

    @Test
    void userDtoRejectsNonPositiveId() {
        assertThatThrownBy(() -> new UserDto(0L, "Alice", "alice@example.com"))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("User id must be positive");
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
}
