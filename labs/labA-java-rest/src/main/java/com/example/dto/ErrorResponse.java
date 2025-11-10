package com.example.dto;

import java.util.Map;

/**
 * Standard error payload for 4xx/5xx responses.
 */
public record ErrorResponse(String message, String code, Map<String, String> details) { }