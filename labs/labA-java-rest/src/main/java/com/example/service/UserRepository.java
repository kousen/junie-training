package com.example.service;

import com.example.web.dto.CreateUserRequest;
import com.example.web.dto.UserDto;

import java.util.List;
import java.util.Optional;

public interface UserRepository {
    List<UserDto> findAll();
    Optional<UserDto> findById(Long id);
    UserDto save(CreateUserRequest req);
}
