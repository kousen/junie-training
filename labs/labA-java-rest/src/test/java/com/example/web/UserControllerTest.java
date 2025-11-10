package com.example.web;

import com.example.dto.CreateUserRequest;
import com.example.dto.UserResponse;
import com.example.service.UserNotFoundException;
import com.example.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @MockitoBean
    UserService userService;

    @Test
    @DisplayName("GET /api/users returns 200 with list of users")
    void getAllUsers_success() throws Exception {
        // Given
        var users = List.of(
                new UserResponse(1L, "Alice", "alice@example.com"),
                new UserResponse(2L, "Bob", "bob@example.com")
        );
        given(userService.findAll()).willReturn(users);

        // When & Then
        mockMvc.perform(get("/api/users"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].name").value("Alice"))
                .andExpect(jsonPath("$[1].email").value("bob@example.com"));
    }

    @Test
    @DisplayName("GET /api/users/{id} returns 200 when found")
    void getUserById_found() throws Exception {
        // Given
        given(userService.findById(10L)).willReturn(new UserResponse(10L, "Carol", "carol@example.com"));

        // When & Then
        mockMvc.perform(get("/api/users/{id}", 10))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(10))
                .andExpect(jsonPath("$.name").value("Carol"))
                .andExpect(jsonPath("$.email").value("carol@example.com"));
    }

    @Test
    @DisplayName("GET /api/users/{id} returns 404 when not found")
    void getUserById_notFound() throws Exception {
        // Given
        given(userService.findById(99L)).willThrow(new UserNotFoundException(99L));

        // When & Then
        mockMvc.perform(get("/api/users/{id}", 99))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value("USER_NOT_FOUND"))
                .andExpect(jsonPath("$.message").isString());
    }

    @Test
    @DisplayName("POST /api/users returns 201 and Location header for valid request")
    void createUser_success() throws Exception {
        // Given
        var request = new CreateUserRequest(" John ", " JOHN@EXAMPLE.COM ");
        var created = new UserResponse(42L, "John", "john@example.com");
        given(userService.create(any(CreateUserRequest.class))).willReturn(created);

        // When & Then
        var result = mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", org.hamcrest.Matchers.containsString("/api/users/42")))
                .andExpect(jsonPath("$.id").value(42))
                .andExpect(jsonPath("$.email").value("john@example.com"))
                .andReturn();

        assertThat(result.getResponse().getContentAsString()).contains("john@example.com");
    }

    @Test
    @DisplayName("POST /api/users returns 400 for validation errors")
    void createUser_validationError() throws Exception {
        // Given: invalid request (blank name, bad email)
        String body = "{" +
                "\"name\": \"\"," +
                "\"email\": \"not-an-email\"" +
                "}";

        // When & Then
        mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"))
                .andExpect(jsonPath("$.details.name").value("Name is required"))
                .andExpect(jsonPath("$.details.email").value("Valid email required"));
    }

    @Test
    @DisplayName("POST /api/users returns 400 when email already exists")
    void createUser_duplicateEmail() throws Exception {
        // Given
        var request = new CreateUserRequest("John", "john@example.com");
        given(userService.create(any(CreateUserRequest.class)))
                .willThrow(new IllegalArgumentException("Email already in use: john@example.com"));

        // When & Then
        mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("BAD_REQUEST"))
                .andExpect(jsonPath("$.message").value(org.hamcrest.Matchers.containsString("Email already in use")));
    }
}
