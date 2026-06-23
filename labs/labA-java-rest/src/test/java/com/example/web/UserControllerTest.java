package com.example.web;

import com.example.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private UserService userService;

    @Test
    void getAllUsersReturnsListOfUsers() throws Exception {
        UserResponse user = new UserResponse(1L, "Jane Doe", "jane@example.com");
        when(userService.getAllUsers()).thenReturn(List.of(user));

        mockMvc.perform(get("/api/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].name").value("Jane Doe"))
                .andExpect(jsonPath("$[0].email").value("jane@example.com"));
    }

    @Test
    void getUserByIdReturnsUserWhenFound() throws Exception {
        UserResponse user = new UserResponse(1L, "Jane Doe", "jane@example.com");
        when(userService.getUserById(1L)).thenReturn(Optional.of(user));

        mockMvc.perform(get("/api/users/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Jane Doe"))
                .andExpect(jsonPath("$.email").value("jane@example.com"));
    }

    @Test
    void getUserByIdReturns404WhenNotFound() throws Exception {
        when(userService.getUserById(99L)).thenReturn(Optional.empty());

        var result = mockMvc.perform(get("/api/users/99"))
                .andExpect(status().isNotFound())
                .andExpect(content().contentType(MediaType.APPLICATION_PROBLEM_JSON))
                .andExpect(jsonPath("$.title").value("User not found"))
                .andExpect(jsonPath("$.status").value(404))
                .andReturn();

        assertThat(result.getResponse().getContentAsString())
                .contains("User 99 was not found");
    }

    @Test
    void createUserReturns201AndUser() throws Exception {
        UserRequest request = new UserRequest("John Doe", "john@example.com");
        UserResponse response = new UserResponse(1L, "John Doe", "john@example.com");
        when(userService.createUser(any(UserRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("John Doe"))
                .andExpect(jsonPath("$.email").value("john@example.com"));
    }

    @Test
    void createUserReturns400WhenInputIsInvalid() throws Exception {
        String invalidJson = "{\"name\": \"Valid Name\", \"email\": \"invalid-email\"}";

        var result = mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(invalidJson))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(MediaType.APPLICATION_PROBLEM_JSON))
                .andExpect(jsonPath("$.title").value("Validation failed"))
                .andExpect(jsonPath("$.status").value(400))
                .andReturn();

        assertThat(result.getResponse().getContentAsString())
                .contains("Email must be valid");
    }

    @Test
    void createUserReturns400WhenNameIsBlank() throws Exception {
        String invalidJson = "{\"name\": \"\", \"email\": \"john@example.com\"}";

        var result = mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(invalidJson))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(MediaType.APPLICATION_PROBLEM_JSON))
                .andExpect(jsonPath("$.title").value("Validation failed"))
                .andExpect(jsonPath("$.status").value(400))
                .andReturn();

        assertThat(result.getResponse().getContentAsString())
                .contains("Name is required and cannot be blank");
    }

    @Test
    void updateUserEmailReturnsUserWithUpdatedEmail() throws Exception {
        UserEmailUpdateRequest request = new UserEmailUpdateRequest("new@example.com");
        UserResponse response = new UserResponse(1L, "Jane Doe", "new@example.com");
        when(userService.updateUserEmail(1L, request)).thenReturn(Optional.of(response));

        mockMvc.perform(patch("/api/users/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Jane Doe"))
                .andExpect(jsonPath("$.email").value("new@example.com"));
    }

    @Test
    void updateUserEmailReturns404WhenNotFound() throws Exception {
        UserEmailUpdateRequest request = new UserEmailUpdateRequest("new@example.com");
        when(userService.updateUserEmail(99L, request)).thenReturn(Optional.empty());

        var result = mockMvc.perform(patch("/api/users/99")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound())
                .andExpect(content().contentType(MediaType.APPLICATION_PROBLEM_JSON))
                .andExpect(jsonPath("$.title").value("User not found"))
                .andExpect(jsonPath("$.status").value(404))
                .andReturn();

        assertThat(result.getResponse().getContentAsString())
                .contains("User 99 was not found");
    }

    @Test
    void updateUserEmailReturns400WhenEmailIsInvalid() throws Exception {
        String invalidJson = "{\"email\": \"invalid-email\"}";

        var result = mockMvc.perform(patch("/api/users/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(invalidJson))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(MediaType.APPLICATION_PROBLEM_JSON))
                .andExpect(jsonPath("$.title").value("Validation failed"))
                .andExpect(jsonPath("$.status").value(400))
                .andReturn();

        assertThat(result.getResponse().getContentAsString())
                .contains("Email must be valid");
    }

    @Test
    void updateUserEmailReturns400WhenEmailIsBlank() throws Exception {
        String invalidJson = "{\"email\": \"\"}";

        var result = mockMvc.perform(patch("/api/users/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(invalidJson))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(MediaType.APPLICATION_PROBLEM_JSON))
                .andExpect(jsonPath("$.title").value("Validation failed"))
                .andExpect(jsonPath("$.status").value(400))
                .andReturn();

        assertThat(result.getResponse().getContentAsString())
                .contains("Email is required and cannot be blank");
    }
}
