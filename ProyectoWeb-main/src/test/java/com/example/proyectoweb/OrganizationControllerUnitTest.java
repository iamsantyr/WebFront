package com.example.proyectoweb;

import com.example.proyectoweb.Controller.OrganizationController;
import com.example.proyectoweb.Dto.OrganizationDto;
import com.example.proyectoweb.Servicio.OrganizationService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@ActiveProfiles("test")
public class OrganizationControllerUnitTest {

    static class OrgServiceStub extends OrganizationService {
        public OrgServiceStub() { super(null, null); }
        @Override public OrganizationDto crear(OrganizationDto dto) { return new OrganizationDto(1L, dto.getName(), dto.getNit(), dto.getEmail()); }
        @Override public Optional<OrganizationDto> obtener(Long id) { return id==1L? Optional.of(new OrganizationDto(1L,"ACME","NIT","mail")): Optional.empty(); }
        @Override public List<OrganizationDto> listar() { return List.of(new OrganizationDto(1L,"ACME","NIT","mail")); }
        @Override public Optional<OrganizationDto> actualizar(Long id, OrganizationDto dto) { return Optional.of(new OrganizationDto(id, dto.getName(), dto.getNit(), dto.getEmail())); }
        @Override public boolean eliminar(Long id) { return id != 404L; }
    }

    @Test
    void create_get_update_delete() {
        OrganizationController c = new OrganizationController(new OrgServiceStub());
        ResponseEntity<OrganizationDto> r = c.create(new OrganizationDto(null,"ACME","NIT","mail"));
        assertEquals(201, r.getStatusCode().value());
        assertEquals(1L, r.getBody().getId());
        assertTrue(c.get(1L).getStatusCode().is2xxSuccessful());
        assertEquals(404, c.get(2L).getStatusCode().value());
        assertEquals(204, c.delete(1L).getStatusCode().value());
        assertEquals(404, c.delete(404L).getStatusCode().value());
    }
}
