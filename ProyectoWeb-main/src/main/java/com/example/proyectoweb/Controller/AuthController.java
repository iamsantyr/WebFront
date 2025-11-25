package com.example.proyectoweb.Controller;

import com.example.proyectoweb.Dto.LoginDto;
import com.example.proyectoweb.Servicio.PersonaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final PersonaService personas;



    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto req) {
        return personas.obtenerPorEmail(req.getEmail())
                .filter(p -> p.getPassword() != null && p.getPassword().equals(req.getPassword()))
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas"));
    }
}
