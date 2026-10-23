package com.example.dto;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

class CreateUserRequestTest {

    private static ValidatorFactory validatorFactory;
    private static Validator validator;

    @BeforeAll
    static void setUpValidator() {
        validatorFactory = Validation.buildDefaultValidatorFactory();
        validator = validatorFactory.getValidator();
    }

    @AfterAll
    static void closeValidator() {
        validatorFactory.close();
    }

    @Test
    void normalizesFieldsAndPassesValidation() {
        CreateUserRequest request = new CreateUserRequest("  Alice Smith  ", "  ALICE@Example.com  ");

        assertThat(request.name()).isEqualTo("Alice Smith");
        assertThat(request.email()).isEqualTo("alice@example.com");
        assertThat(validator.validate(request)).isEmpty();
    }

    @Test
    void rejectsInvalidNameAndEmail() {
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
    void retainsNullFieldsForBeanValidation() {
        CreateUserRequest request = new CreateUserRequest(null, null);

        assertThat(request.name()).isNull();
        assertThat(request.email()).isNull();
        assertThat(validator.validate(request))
                .extracting(ConstraintViolation::getMessage)
                .containsExactlyInAnyOrder("Name must not be blank", "Email must not be blank");
    }
}