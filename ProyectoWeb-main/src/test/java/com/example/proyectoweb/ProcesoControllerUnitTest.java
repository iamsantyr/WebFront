package com.example.proyectoweb;

import com.example.proyectoweb.Controller.ProcesoController;
import com.example.proyectoweb.Dto.ProcesoDto;
import com.example.proyectoweb.Modelo.ProcessHistory;
import com.example.proyectoweb.Servicio.ProcesoService;
import com.example.proyectoweb.common.ProcessStatus;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

@SpringBootTest
@ActiveProfiles("test")
public class ProcesoControllerUnitTest {

    static class ProcesoServiceStub extends ProcesoService {
        public ProcesoServiceStub() { super(null,null,null,null,null,null); }
        @Override public ProcesoDto crear(ProcesoDto dto, String actorEmail) {
            return new ProcesoDto(100L, dto.getName(), dto.getDescription(), dto.getCategory(),
                    dto.getStatus(), dto.getOrganizationId(), dto.getActivityIds(), dto.getArchIds(), dto.getGatewayIds());
        }
        @Override public Optional<ProcesoDto> obtener(Long id) {
            return id==100L ? Optional.of(new ProcesoDto(100L,"N","D","C",ProcessStatus.DRAFT,1L,null,null,null)) : Optional.empty();
        }
        @Override public List<ProcesoDto> listar(Long orgId, ProcessStatus status) {
            List<ProcesoDto> list = new ArrayList<>();
            list.add(new ProcesoDto(1L,"P1","D1","Cat",ProcessStatus.DRAFT,1L,null,null,null));
            list.add(new ProcesoDto(2L,"P2","D2","Cat",ProcessStatus.PUBLISHED,1L,null,null,null));
            if (status==null) return list;
            List<ProcesoDto> out = new ArrayList<>();
            for (ProcesoDto p : list) if (p.getStatus()==status) out.add(p);
            return out;
        }
        @Override public Optional<ProcesoDto> actualizar(Long id, ProcesoDto dto, String actorEmail) {
            return Optional.of(new ProcesoDto(id, dto.getName(), dto.getDescription(), dto.getCategory(),
                    dto.getStatus(), dto.getOrganizationId(), dto.getActivityIds(), dto.getArchIds(), dto.getGatewayIds()));
        }
        @Override public boolean eliminar(Long id, boolean hardDelete, String actorEmail) { return id != 404L; }
        @Override public List<ProcessHistory> historial(Long procesoId) {
            ProcessHistory h = new ProcessHistory();
            h.setId(1L);
            h.setCreatedAt(Instant.now());
            return List.of(h);
        }
    }

    @Test
    void list_sinFiltros_devuelveLista() {
        ProcesoController controller = new ProcesoController(new ProcesoServiceStub());
        List<ProcesoDto> r = controller.list(null, null);
        assertFalse(r.isEmpty());
    }

    @Test
    void create_201() {
        ProcesoController controller = new ProcesoController(new ProcesoServiceStub());
        ProcesoDto dto = new ProcesoDto(null,"Onb","Desc","RRHH",ProcessStatus.DRAFT,1L,null,null,null);
        ResponseEntity<ProcesoDto> r = controller.create(dto, "ana@acme.com");
        assertEquals(201, r.getStatusCode().value());
        assertEquals(100L, r.getBody().getId());
    }

    @Test
    void delete_204_y_404() {
        ProcesoController controller = new ProcesoController(new ProcesoServiceStub());
        assertEquals(204, controller.delete(100L, false, "ana@acme.com").getStatusCode().value());
        assertEquals(404, controller.delete(404L, false, "ana@acme.com").getStatusCode().value());
    }
}
