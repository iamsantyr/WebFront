package com.example.proyectoweb.Controller;

import com.example.proyectoweb.Dto.ArchDto;
import com.example.proyectoweb.Servicio.ArchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequiredArgsConstructor
@RequestMapping("/api/archs")
@CrossOrigin(origins = "http://localhost:4200")
public class ArchController {

    private final ArchService service;

    @GetMapping("/list")
    public List<ArchDto> list() { return service.listar(); }

    @GetMapping("/get/{id}")
    public ResponseEntity<ArchDto> get(@PathVariable Long id) {
        return service.obtener(id).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    public ResponseEntity<ArchDto> create(@RequestBody ArchDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(dto));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ArchDto> update(@PathVariable Long id, @RequestBody ArchDto dto) {
        return service.actualizar(id, dto).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id,
                                       @RequestHeader(value="X-Confirm-Delete", required=false) String confirm) {
        if (!"true".equalsIgnoreCase(confirm)) return ResponseEntity.status(HttpStatus.PRECONDITION_REQUIRED).build();
        return service.eliminar(id)? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}
