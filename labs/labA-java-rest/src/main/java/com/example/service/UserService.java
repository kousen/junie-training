package com.example.service;

import com.example.dto.CreateUserRequest;
import com.example.dto.UserResponse;

import java.util.List;

public interface UserService {
    List<UserResponse> findAll();
    UserResponse findById(long id) throws UserNotFoundException;
    UserResponse create(CreateUserRequest request);
}