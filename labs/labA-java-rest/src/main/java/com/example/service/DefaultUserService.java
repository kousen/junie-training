package com.example.service;

import com.example.web.dto.CreateUserRequest;
import com.example.web.dto.UserDto;
import com.example.web.error.NotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DefaultUserService implements UserService {

    private final UserRepository userRepository;

    public DefaultUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<UserDto> findAll() {
        return userRepository.findAll();
    }

    @Override
    public UserDto findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User %d not found".formatted(id)));
    }

    @Override
    public UserDto create(CreateUserRequest req) {
        return userRepository.save(req);
    }
}
