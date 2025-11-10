package com.example.service;

import com.example.dto.CreateUserRequest;
import com.example.dto.UserResponse;
import com.example.repository.UserEntity;
import com.example.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DefaultUserService implements UserService {

    private final UserRepository repository;

    public DefaultUserService(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<UserResponse> findAll() {
        return repository.findAll().stream()
                .map(this::toDto)
                .toList();
    }

    @Override
    public UserResponse findById(long id) throws UserNotFoundException {
        return repository.findById(id)
                .map(this::toDto)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @Override
    public UserResponse create(CreateUserRequest request) {
        repository.findByEmailIgnoreCase(request.email()).ifPresent(u -> {
            throw new IllegalArgumentException("Email already in use: " + request.email());
        });
        UserEntity saved = repository.save(new UserEntity(null, request.name(), request.email()));
        return toDto(saved);
    }

    private UserResponse toDto(UserEntity e) {
        return new UserResponse(e.getId(), e.getName(), e.getEmail());
    }
}