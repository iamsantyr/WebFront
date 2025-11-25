// Controlador
package com.example.proyectoweb.Controller;

import com.example.proyectoweb.Dto.GatewayDto;
import com.example.proyectoweb.Servicio.GatewayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequiredArgsConstructor
@RequestMapping("/api/gateways")
@CrossOrigin(origins = "http://localhost:4200")
public class GatewayController {

    private final GatewayService service;

    @GetMapping("/list")
    public List<GatewayDto> list() { return service.listar(); }

    @GetMapping("/get/{id}")
    public ResponseEntity<GatewayDto> get(@PathVariable Long id) {
        return service.obtener(id).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    public ResponseEntity<GatewayDto> create(@RequestBody GatewayDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(dto));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<GatewayDto> update(@PathVariable Long id, @RequestBody GatewayDto dto) {
        return service.actualizar(id, dto).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id,
                                       @RequestHeader(value="X-Confirm-Delete", required=false) String confirm) {
        if (!"true".equalsIgnoreCase(confirm)) return ResponseEntity.status(HttpStatus.PRECONDITION_REQUIRED).build();
        return service.eliminar(id) ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}
