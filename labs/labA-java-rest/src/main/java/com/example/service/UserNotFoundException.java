package com.example.service;

/**
 * Thrown when a user is not found.
 */
public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(long id) {
        super("User with id=" + id + " not found");
    }
}