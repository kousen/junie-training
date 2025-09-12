package com.example.web;

import com.example.service.UserService;
import com.example.web.dto.CreateUserRequest;
import com.example.web.dto.UserDto;
import com.example.web.error.GlobalExceptionHandler;
import com.example.web.error.NotFoundException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
@Import(GlobalExceptionHandler.class)
class UserControllerTest {

    @Autowired MockMvc mvc;
    @Autowired ObjectMapper objectMapper;

    @MockitoBean UserService userService;

    @Test
    @DisplayName("GET /api/users returns 200 and list of users")
    void listUsers_ok() throws Exception {
        given(userService.findAll()).willReturn(List.of(
                new UserDto(1L, "Alice", "alice@example.com"),
                new UserDto(2L, "Bob", "bob@example.com")
        ));

        mvc.perform(get("/api/users"))
           .andExpect(status().isOk())
           .andExpect(jsonPath("$[0].id").value(1))
           .andExpect(jsonPath("$[0].name").value("Alice"))
           .andExpect(jsonPath("$[0].email").value("alice@example.com"));
    }

    @Test
    @DisplayName("GET /api/users/{id} returns 404 when not found")
    void getUser_notFound() throws Exception {
        given(userService.findById(99L)).willThrow(new NotFoundException("User 99 not found"));

        mvc.perform(get("/api/users/99"))
           .andExpect(status().isNotFound())
           .andExpect(jsonPath("$.title").value("Resource not found"))
           .andExpect(jsonPath("$.detail").value("User 99 not found"));
    }

    @Test
    @DisplayName("POST /api/users returns 201 on success with Location header")
    void createUser_created() throws Exception {
        CreateUserRequest req = new CreateUserRequest(" Charlie ", " CHARLIE@EXAMPLE.COM ");
        UserDto created = new UserDto(10L, "Charlie", "charlie@example.com");
        given(userService.create(req)).willReturn(created);

        mvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
           .andExpect(status().isCreated())
           .andExpect(header().string("Location", "http://localhost/api/users/10"))
           .andExpect(jsonPath("$.id").value(10))
           .andExpect(jsonPath("$.email").value("charlie@example.com"));
    }

    @Test
    @DisplayName("POST /api/users returns 400 when payload is invalid")
    void createUser_badRequest() throws Exception {
        // Both name and email invalid
        String invalidJson = """
                {"name":"","email":"not-an-email"}""";

        mvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(invalidJson))
           .andExpect(status().isBadRequest())
           .andExpect(jsonPath("$.title").value("Validation failed"))
           .andExpect(jsonPath("$.errors.name").exists())
           .andExpect(jsonPath("$.errors.email").exists());
    }

    @Test
    @DisplayName("GET /api/users/{id} returns 400 when id is not positive")
    void getUser_idValidation() throws Exception {
        mvc.perform(get("/api/users/0"))
           .andExpect(status().isBadRequest());
    }
}
