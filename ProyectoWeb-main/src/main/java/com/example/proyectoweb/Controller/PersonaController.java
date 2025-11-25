package com.example.proyectoweb.Controller;

import com.example.proyectoweb.Dto.PersonaDto;
import com.example.proyectoweb.Servicio.PersonaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/people")
@CrossOrigin(origins = "http://localhost:4200")
public class PersonaController {

    private final PersonaService service;

    @GetMapping("/list")
    public List<PersonaDto> list() { return service.listar(); }

    @GetMapping("/get/{id}")
    public ResponseEntity<PersonaDto> get(@PathVariable Long id) {
        return service.obtener(id).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/getEmail/{email}")
    public ResponseEntity<PersonaDto> getByEmail(@PathVariable String email) {
        return service.obtenerPorEmail(email).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    public ResponseEntity<PersonaDto> create(@RequestBody PersonaDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(dto));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<PersonaDto> update(@PathVariable Long id, @RequestBody PersonaDto dto) {
        return service.actualizar(id, dto).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return service.eliminar(id)? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}
