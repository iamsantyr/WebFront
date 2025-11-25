package com.example.proyectoweb;

import com.example.proyectoweb.Controller.ArchController;
import com.example.proyectoweb.Dto.ArchDto;
import com.example.proyectoweb.Servicio.ArchService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@ActiveProfiles("test")
public class ArchControllerUnitTest {

    static class ArchServiceStub extends ArchService {
        public ArchServiceStub() { super(null, null); }
        @Override public boolean eliminar(Long id) { return id != 404L; }
        @Override public ArchDto crear(ArchDto dto) { return new ArchDto(1L, dto.getActividadI(), dto.getActividadD()); }
        @Override public java.util.List<ArchDto> listar() { return List.of(new ArchDto(1L, 1L, 2L)); }
        @Override public java.util.Optional<ArchDto> obtener(Long id) { return id==1L ? Optional.of(new ArchDto(1L,1L,2L)) : Optional.empty(); }
        @Override public Optional<ArchDto> actualizar(Long id, ArchDto dto) { return Optional.of(new ArchDto(id, dto.getActividadI(), dto.getActividadD())); }
    }

    @Test
    void delete_sinConfirmHeader_devuelve428() {
        ArchController controller = new ArchController(new ArchServiceStub());
        ResponseEntity<Void> r = controller.delete(1L, null);
        assertEquals(428, r.getStatusCode().value());
    }

    @Test
    void delete_confirmado_existente_204() {
        ArchController controller = new ArchController(new ArchServiceStub());
        ResponseEntity<Void> r = controller.delete(1L, "true");
        assertEquals(204, r.getStatusCode().value());
    }

    @Test
    void delete_confirmado_noExistente_404() {
        ArchController controller = new ArchController(new ArchServiceStub());
        ResponseEntity<Void> r = controller.delete(404L, "true");
        assertEquals(404, r.getStatusCode().value());
    }

    @Test
    void create_201YBodyConId() {
        ArchController controller = new ArchController(new ArchServiceStub());
        ResponseEntity<ArchDto> r = controller.create(new ArchDto(null, 1L, 2L));
        assertEquals(201, r.getStatusCode().value());
        assertEquals(1L, r.getBody().getId());
    }
}
