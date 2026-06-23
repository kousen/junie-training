package com.example.service;

import com.example.dto.UserRequest;
import com.example.dto.UserResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class UserService {
    private final ConcurrentHashMap<Long, UserResponse> users = new ConcurrentHashMap<>();
    private final AtomicLong idGenerator = new AtomicLong(1);

    public List<UserResponse> getAllUsers() {
        return List.copyOf(users.values());
    }

    public Optional<UserResponse> getUserById(Long id) {
        return Optional.ofNullable(users.get(id));
    }

    public UserResponse createUser(UserRequest request) {
        Long id = idGenerator.getAndIncrement();
        UserResponse newUser = new UserResponse(id, request.name(), request.email());
        users.put(id, newUser);
        return newUser;
    }
}
