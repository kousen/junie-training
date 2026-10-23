package com.example;

import com.example.dto.UserDto;
import com.example.web.ErrorResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestClient;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UserApiIntegrationTest {

    @LocalServerPort
    private int port;

    @Autowired
    private ObjectMapper objectMapper;

    private RestClient restClient;

    @BeforeEach
    void createRestClient() {
        restClient = RestClient.builder()
                .baseUrl("http://localhost:" + port)
                .build();
    }

    @Test
    void fullCrudLifecycleAndHttpErrors() throws Exception {
        HttpResult initialList = exchange(restClient.get().uri("/api/users"));
        assertThat(initialList.status()).isEqualTo(200);
        assertThat(readUsers(initialList.body())).isEmpty();

        HttpResult create = exchange(restClient.post()
                .uri("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .body("""
                        {"name":"  Alice Smith  ","email":"  ALICE@Example.com  "}
                        """));
        assertThat(create.status()).isEqualTo(201);
        assertThat(create.location()).isNotBlank();
        URI location = URI.create(create.location());
        String userPath = location.getPath();
        UserDto created = readUser(create.body());
        assertThat(userPath).isEqualTo("/api/users/" + created.id());
        assertThat(created.name()).isEqualTo("Alice Smith");
        assertThat(created.email()).isEqualTo("alice@example.com");

        HttpResult getCreated = exchange(restClient.get().uri(userPath));
        assertThat(getCreated.status()).isEqualTo(200);
        assertThat(readUser(getCreated.body())).isEqualTo(created);

        HttpResult update = exchange(restClient.put()
                .uri(userPath)
                .contentType(MediaType.APPLICATION_JSON)
                .body("""
                        {"name":"Alice Jones","email":"ALICE@Example.org"}
                        """));
        assertThat(update.status()).isEqualTo(200);
        UserDto updated = readUser(update.body());
        assertThat(updated).isEqualTo(new UserDto(created.id(), "Alice Jones", "alice@example.org"));

        HttpResult updatedList = exchange(restClient.get().uri("/api/users"));
        assertThat(readUsers(updatedList.body())).containsExactly(updated);

        HttpResult invalidCreate = exchange(restClient.post()
                .uri("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .body("""
                        {"name":"   ","email":"alice@example.com"}
                        """));
        assertThat(invalidCreate.status()).isEqualTo(400);
        assertThat(readError(invalidCreate.body()).message()).isEqualTo("Name must not be blank");

        HttpResult typeMismatch = exchange(restClient.get().uri("/api/users/abc"));
        assertThat(typeMismatch.status()).isEqualTo(400);
        assertThat(readError(typeMismatch.body()).message())
                .isEqualTo("Invalid value 'abc' for parameter 'id'");

        String missingUserPath = "/api/users/9223372036854775807";
        HttpResult updateMissing = exchange(restClient.put()
                .uri(missingUserPath)
                .contentType(MediaType.APPLICATION_JSON)
                .body("""
                        {"name":"Missing User","email":"missing@example.com"}
                        """));
        assertThat(updateMissing.status()).isEqualTo(404);
        assertThat(readError(updateMissing.body()).path()).isEqualTo(missingUserPath);

        HttpResult deleteMissing = exchange(restClient.delete().uri(missingUserPath));
        assertThat(deleteMissing.status()).isEqualTo(404);
        assertThat(readError(deleteMissing.body()).path()).isEqualTo(missingUserPath);

        HttpResult delete = exchange(restClient.delete().uri(userPath));
        assertThat(delete.status()).isEqualTo(204);
        assertThat(delete.body()).isEmpty();

        HttpResult getDeleted = exchange(restClient.get().uri(userPath));
        assertThat(getDeleted.status()).isEqualTo(404);
        assertThat(readError(getDeleted.body()).path()).isEqualTo(userPath);
    }

    private HttpResult exchange(RestClient.RequestHeadersSpec<?> request) throws IOException {
        return request.exchange((httpRequest, response) -> new HttpResult(
                response.getStatusCode().value(),
                response.getHeaders().getFirst(HttpHeaders.LOCATION),
                new String(response.getBody().readAllBytes(), StandardCharsets.UTF_8)
        ));
    }

    private UserDto readUser(String body) throws IOException {
        return objectMapper.readValue(body, UserDto.class);
    }

    private List<UserDto> readUsers(String body) throws IOException {
        return objectMapper.readValue(body, new TypeReference<>() {});
    }

    private ErrorResponse readError(String body) throws IOException {
        return objectMapper.readValue(body, ErrorResponse.class);
    }

    private record HttpResult(int status, String location, String body) {}
}