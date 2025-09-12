package com.example.service;

import com.example.web.dto.CreateUserRequest;
import com.example.web.dto.UserDto;
import com.example.web.error.NotFoundException;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class InMemoryUserService implements UserService {
    private final Map<Long, UserDto> store = new ConcurrentHashMap<>();
    private final AtomicLong seq = new AtomicLong(0);

    @Override
    public List<UserDto> findAll() {
        return store.values().stream()
                .sorted(Comparator.comparing(UserDto::id))
                .toList();
    }

    @Override
    public UserDto findById(Long id) {
        var user = store.get(id);
        if (user == null) throw new NotFoundException("User %d not found".formatted(id));
        return user;
    }

    @Override
    public UserDto create(CreateUserRequest req) {
        long id = seq.incrementAndGet();
        var dto = new UserDto(id, req.name(), req.email());
        store.put(id, dto);
        return dto;
    }
}
