package com.example.web;

import com.example.service.UserNotFoundException;
import com.example.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private UserService userService;

    @Test
    void getAllUsersReturnsUserList() throws Exception {
        List<UserDto> expectedUsers = List.of(
                new UserDto(1L, "Alice Smith", "alice@example.com"),
                new UserDto(2L, "Bob Jones", "bob@example.com")
        );
        when(userService.findAll()).thenReturn(expectedUsers);

        MvcResult result = mockMvc.perform(get("/api/users"))
                .andReturn();

        assertThat(result.getResponse().getStatus()).isEqualTo(200);
        List<UserDto> actualUsers = objectMapper.readValue(
                result.getResponse().getContentAsString(),
                new TypeReference<List<UserDto>>() {}
        );
        assertThat(actualUsers).containsExactlyElementsOf(expectedUsers);
    }

    @Test
    void getUserByIdReturnsUserWhenFound() throws Exception {
        UserDto expected = new UserDto(1L, "Alice Smith", "alice@example.com");
        when(userService.findById(1L)).thenReturn(expected);

        MvcResult result = mockMvc.perform(get("/api/users/1"))
                .andReturn();

        assertThat(result.getResponse().getStatus()).isEqualTo(200);
        UserDto actual = objectMapper.readValue(result.getResponse().getContentAsString(), UserDto.class);
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void getUserByIdReturns404WhenNotFound() throws Exception {
        when(userService.findById(999L)).thenThrow(new UserNotFoundException(999L));

        MvcResult result = mockMvc.perform(get("/api/users/999"))
                .andReturn();

        assertThat(result.getResponse().getStatus()).isEqualTo(404);
        ErrorResponse error = objectMapper.readValue(result.getResponse().getContentAsString(), ErrorResponse.class);
        assertThat(error.status()).isEqualTo(404);
        assertThat(error.error()).isEqualTo("Not Found");
        assertThat(error.message()).isEqualTo("User not found with id: 999");
        assertThat(error.path()).isEqualTo("/api/users/999");
        assertThat(error.timestamp()).isNotNull();
    }

    @Test
    void createUserWithValidNormalizedInputReturns201() throws Exception {
        UserDto created = new UserDto(1L, "Alice Smith", "alice@example.com");
        when(userService.create(new CreateUserRequest("Alice Smith", "alice@example.com"))).thenReturn(created);

        MvcResult result = mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"name": "  Alice Smith  ", "email": "  ALICE@Example.com "}
                                """))
                .andReturn();

        assertThat(result.getResponse().getStatus()).isEqualTo(201);
        assertThat(result.getResponse().getHeader("Location")).isEqualTo("/api/users/1");
        UserDto actual = objectMapper.readValue(result.getResponse().getContentAsString(), UserDto.class);
        assertThat(actual).isEqualTo(created);
    }

    @Test
    void createUserWithBlankNameReturns400() throws Exception {
        MvcResult result = mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"name": "   ", "email": "alice@example.com"}
                                """))
                .andReturn();

        assertThat(result.getResponse().getStatus()).isEqualTo(400);
        ErrorResponse error = objectMapper.readValue(result.getResponse().getContentAsString(), ErrorResponse.class);
        assertThat(error.status()).isEqualTo(400);
        assertThat(error.message()).isEqualTo("Name must not be blank");
        assertThat(error.path()).isEqualTo("/api/users");
        verifyNoInteractions(userService);
    }

    @Test
    void createUserWithInvalidEmailReturns400() throws Exception {
        MvcResult result = mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"name": "Alice", "email": "not-an-email"}
                                """))
                .andReturn();

        assertThat(result.getResponse().getStatus()).isEqualTo(400);
        ErrorResponse error = objectMapper.readValue(result.getResponse().getContentAsString(), ErrorResponse.class);
        assertThat(error.status()).isEqualTo(400);
        assertThat(error.message()).isEqualTo("Email must be a valid address");
        assertThat(error.path()).isEqualTo("/api/users");
        verifyNoInteractions(userService);
    }

    @Test
    void createUserWithMultipleInvalidFieldsReturnsAllValidationMessages() throws Exception {
        MvcResult result = mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"name": "   ", "email": "not-an-email"}
                                """))
                .andReturn();

        assertThat(result.getResponse().getStatus()).isEqualTo(400);
        ErrorResponse error = objectMapper.readValue(result.getResponse().getContentAsString(), ErrorResponse.class);
        assertThat(error.status()).isEqualTo(400);
        assertThat(error.message())
                .contains("Name must not be blank")
                .contains("Email must be a valid address");
        assertThat(error.path()).isEqualTo("/api/users");
        verifyNoInteractions(userService);
    }

    @Test
    void createUserWithMalformedJsonReturns400() throws Exception {
        MvcResult result = mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{invalid json"))
                .andReturn();

        assertThat(result.getResponse().getStatus()).isEqualTo(400);
        ErrorResponse error = objectMapper.readValue(result.getResponse().getContentAsString(), ErrorResponse.class);
        assertThat(error.status()).isEqualTo(400);
        assertThat(error.message()).isEqualTo("Malformed JSON request");
        assertThat(error.path()).isEqualTo("/api/users");
        verifyNoInteractions(userService);
    }
}
