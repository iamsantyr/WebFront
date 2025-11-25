package com.example.proyectoweb.common;

public class DomainExceptions {
    public static class NotFound extends RuntimeException {
        public NotFound(String msg) { super(msg); }
    }
    public static class Conflict extends RuntimeException {
        public Conflict(String msg) { super(msg); }
    }
    public static class BadRequest extends RuntimeException {
        public BadRequest(String msg) { super(msg); }
    }
}
