package com.example.proyectoweb;

import com.example.proyectoweb.Controller.GatewayController;
import com.example.proyectoweb.Dto.GatewayDto;
import com.example.proyectoweb.common.GatewayType;
import com.example.proyectoweb.Servicio.GatewayService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@ActiveProfiles("test")
public class GatewayControllerUnitTest {

    static class GatewayServiceStub extends GatewayService {
        public GatewayServiceStub() { super(null, null); }
        @Override public boolean eliminar(Long id) { return id != 404L; }
        @Override public GatewayDto crear(GatewayDto dto) { return new GatewayDto(10L, GatewayType.EXCLUSIVE, Collections.emptyList(), null); }
        @Override public List<GatewayDto> listar() { return List.of(new GatewayDto(10L, GatewayType.EXCLUSIVE, List.of(), null)); }
        @Override public Optional<GatewayDto> obtener(Long id) { return id==10L ? Optional.of(new GatewayDto(10L,GatewayType.EXCLUSIVE,List.of(),null)) : Optional.empty(); }
        @Override public Optional<GatewayDto> actualizar(Long id, GatewayDto dto) { return Optional.of(new GatewayDto(id, dto.getType(), dto.getArchIds(), dto.getConditionsJson())); }
    }

    @Test
    void delete_sinConfirmHeader_428() {
        GatewayController controller = new GatewayController(new GatewayServiceStub());
        ResponseEntity<Void> r = controller.delete(10L, null);
        assertEquals(428, r.getStatusCode().value());
    }

    @Test
    void delete_confirmado_204() {
        GatewayController controller = new GatewayController(new GatewayServiceStub());
        ResponseEntity<Void> r = controller.delete(10L, "true");
        assertEquals(204, r.getStatusCode().value());
    }

    @Test
    void delete_confirmado_noExistente_404() {
        GatewayController controller = new GatewayController(new GatewayServiceStub());
        ResponseEntity<Void> r = controller.delete(404L, "true");
        assertEquals(404, r.getStatusCode().value());
    }

    @Test
    void create_201() {
        GatewayController controller = new GatewayController(new GatewayServiceStub());
        ResponseEntity<GatewayDto> r = controller.create(new GatewayDto(null, GatewayType.EXCLUSIVE, null, null));
        assertEquals(201, r.getStatusCode().value());
        assertEquals(10L, r.getBody().getId());
    }
}
