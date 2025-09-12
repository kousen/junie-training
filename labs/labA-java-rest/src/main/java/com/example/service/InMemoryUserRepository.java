package com.example.service;

import com.example.web.dto.CreateUserRequest;
import com.example.web.dto.UserDto;
import org.springframework.stereotype.Repository;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class InMemoryUserRepository implements UserRepository {
    private final Map<Long, UserDto> store = new ConcurrentHashMap<>();
    private final AtomicLong seq = new AtomicLong(0);

    @Override
    public List<UserDto> findAll() {
        return store.values().stream()
                .sorted(Comparator.comparing(UserDto::id))
                .toList();
    }

    @Override
    public Optional<UserDto> findById(Long id) {
        return Optional.ofNullable(store.get(id));
    }

    @Override
    public UserDto save(CreateUserRequest req) {
        long id = seq.incrementAndGet();
        var dto = new UserDto(id, req.name(), req.email());
        store.put(id, dto);
        return dto;
    }
}
