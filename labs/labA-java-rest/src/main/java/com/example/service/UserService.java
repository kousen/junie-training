package com.example.service;

import com.example.web.dto.CreateUserRequest;
import com.example.web.dto.UserDto;

import java.util.List;

public interface UserService {
    List<UserDto> findAll();
    UserDto findById(Long id);
    UserDto create(CreateUserRequest req);
}
