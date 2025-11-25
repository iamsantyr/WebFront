package com.example.proyectoweb.Controller;

import com.example.proyectoweb.Dto.ActivityRoleLinkDto;
import com.example.proyectoweb.Dto.ProcessRoleDto;
import com.example.proyectoweb.Servicio.ProcessRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController @RequiredArgsConstructor
@RequestMapping("/api/process-roles")
@CrossOrigin(origins = "http://localhost:4200")
public class ProcessRoleController {

    private final ProcessRoleService service;

    @GetMapping("/list")
    public List<ProcessRoleDto> list(@RequestParam(required = false) Long orgId) {
        return service.listar(orgId);
    }

    @PostMapping("/create")
    public ResponseEntity<ProcessRoleDto> create(@RequestBody ProcessRoleDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(dto));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ProcessRoleDto> update(@PathVariable Long id, @RequestBody ProcessRoleDto dto) {
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

    @PostMapping("/assign-activity")
    public ActivityRoleLinkDto assign(@RequestParam Long actividadId, @RequestParam Long roleId) {
        return service.asignarRolActividad(actividadId, roleId);
    }

    @GetMapping("/{id}/usage")
    public Map<String, List<Long>> usage(@PathVariable Long id) {
        return service.dondeSeUsa(id);
    }
}
