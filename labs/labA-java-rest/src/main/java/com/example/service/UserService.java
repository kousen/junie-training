package com.example.service;

import com.example.web.CreateUserRequest;
import com.example.web.UserDto;
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
}
