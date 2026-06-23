package com.example.web;

class UserNotFoundException extends RuntimeException {
    UserNotFoundException(Long id) {
        super("User " + id + " was not found");
    }
}