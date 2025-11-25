package com.example.proyectoweb.Controller;

import com.example.proyectoweb.Dto.ProcesoDto;
import com.example.proyectoweb.Modelo.ProcessHistory;
import com.example.proyectoweb.Servicio.ProcesoService;
import com.example.proyectoweb.common.ProcessStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequiredArgsConstructor
@RequestMapping("/api/processes")
@CrossOrigin(origins = "http://localhost:4200")
public class ProcesoController {

    private final ProcesoService service;

    @GetMapping("/list")
    public List<ProcesoDto> list(@RequestParam(required = false) Long orgId,
                                 @RequestParam(required = false) ProcessStatus status) {
        return service.listar(orgId, status);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ProcesoDto> get(@PathVariable Long id) {
        return service.obtener(id).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    public ResponseEntity<ProcesoDto> create(@RequestBody ProcesoDto dto,
                                             @RequestHeader(value="X-Actor-Email", required=false) String actor) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(dto, actor));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ProcesoDto> update(@PathVariable Long id,
                                             @RequestBody ProcesoDto dto,
                                             @RequestHeader(value="X-Actor-Email", required=false) String actor) {
        return service.actualizar(id, dto, actor).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id,
                                       @RequestParam(defaultValue = "false") boolean hardDelete,
                                       @RequestHeader(value="X-Actor-Email", required=false) String actor) {
        return service.eliminar(id, hardDelete, actor) ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/history")
    public List<ProcessHistory> history(@PathVariable Long id) {
        return service.historial(id);
    }
}
