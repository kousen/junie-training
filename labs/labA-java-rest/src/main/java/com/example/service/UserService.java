package com.example.service;

import com.example.dto.CreateUserRequest;
import com.example.dto.UserDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class UserService {

    private final Map<Long, UserDto> users = new ConcurrentHashMap<>();
    private final AtomicLong idSequence = new AtomicLong(0);

    public List<UserDto> findAll() {
        return List.copyOf(users.values());
    }

    public UserDto findById(Long id) {
        UserDto user = users.get(id);
        if (user == null) {
            throw new UserNotFoundException(id);
        }
        return user;
    }

    public UserDto create(CreateUserRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("CreateUserRequest must not be null");
        }
        long id = idSequence.incrementAndGet();
        UserDto created = new UserDto(id, request.name(), request.email());
        users.put(id, created);
        return created;
    }

    public UserDto update(Long id, CreateUserRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("CreateUserRequest must not be null");
        }
        UserDto updated = users.computeIfPresent(id,
                (userId, existing) -> new UserDto(userId, request.name(), request.email()));
        if (updated == null) {
            throw new UserNotFoundException(id);
        }
        return updated;
    }

    public void delete(Long id) {
        if (users.remove(id) == null) {
            throw new UserNotFoundException(id);
        }
    }
}
