package com.example.proyectoweb;

import com.example.proyectoweb.Controller.ProcessRoleController;
import com.example.proyectoweb.Dto.ActivityRoleLinkDto;
import com.example.proyectoweb.Dto.ProcessRoleDto;
import com.example.proyectoweb.Servicio.ProcessRoleService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
public class ProcessRoleControllerUnitTest {

    static class RoleServiceStub extends ProcessRoleService {
        public RoleServiceStub() { super(null,null,null,null,null); }
        @Override public ProcessRoleDto crear(ProcessRoleDto dto) { return new ProcessRoleDto(5L, dto.getName(), dto.getOrganizationId()); }
        @Override public List<ProcessRoleDto> listar(Long orgId) { return List.of(new ProcessRoleDto(5L, "Revisor", 1L)); }
        @Override public Optional<ProcessRoleDto> actualizar(Long id, ProcessRoleDto dto) { return Optional.of(new ProcessRoleDto(id, dto.getName(), dto.getOrganizationId())); }
        @Override public boolean eliminar(Long id) { return id != 404L; }
        @Override public ActivityRoleLinkDto asignarRolActividad(Long actividadId, Long roleId) { return new ActivityRoleLinkDto(1L, actividadId, roleId); }
        @Override public Map<String, List<Long>> dondeSeUsa(Long roleId) {
            Map<String, List<Long>> m = new HashMap<>();
            m.put("actividades", List.of(1L,2L));
            m.put("procesos", List.of(10L));
            return m;
        }
    }

    @Test
    void delete_sinConfirm_428_y_conConfirm_204() {
        ProcessRoleController c = new ProcessRoleController(new RoleServiceStub());
        assertEquals(428, c.delete(5L, null).getStatusCode().value());
        assertEquals(204, c.delete(5L, "true").getStatusCode().value());
    }

    @Test
    void delete_conConfirm_noExiste_404() {
        ProcessRoleController c = new ProcessRoleController(new RoleServiceStub());
        assertEquals(404, c.delete(404L, "true").getStatusCode().value());
    }

    @Test
    void usage_devuelveListas() {
        ProcessRoleController c = new ProcessRoleController(new RoleServiceStub());
        Map<String, List<Long>> m = c.usage(5L);
        assertEquals(List.of(1L,2L), m.get("actividades"));
        assertEquals(List.of(10L), m.get("procesos"));
    }
}
