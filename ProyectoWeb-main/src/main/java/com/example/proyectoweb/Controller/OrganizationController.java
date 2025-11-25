package com.example.proyectoweb.Controller;

import com.example.proyectoweb.Dto.OrganizationDto;
import com.example.proyectoweb.Servicio.OrganizationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequiredArgsConstructor
@RequestMapping("/api/organizations")
@CrossOrigin(origins = "http://localhost:4200")
public class OrganizationController {

    private final OrganizationService service;

    @GetMapping("/list")
    public List<OrganizationDto> list() { return service.listar(); }

    @GetMapping("/get/{id}")
    public ResponseEntity<OrganizationDto> get(@PathVariable Long id) {
        return service.obtener(id).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    public ResponseEntity<OrganizationDto> create(@RequestBody OrganizationDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(dto));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<OrganizationDto> update(@PathVariable Long id, @RequestBody OrganizationDto dto) {
        return service.actualizar(id, dto).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return service.eliminar(id) ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}
