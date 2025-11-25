package com.example.proyectoweb;

import com.example.proyectoweb.Controller.PersonaController;
import com.example.proyectoweb.Dto.PersonaDto;
import com.example.proyectoweb.Servicio.PersonaService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
public class PersonaControllerUnitTest {

    static class PersonaServiceStub extends PersonaService {
        public PersonaServiceStub() { super(null, null, null); }
        @Override public PersonaDto crear(PersonaDto dto) { return new PersonaDto(1L, dto.getName(), dto.getEmail(), dto.getPassword(), dto.getOrganizationId()); }
        @Override public Optional<PersonaDto> obtener(Long id) { return id==1L? Optional.of(new PersonaDto(1L,"Ana","ana@acme.com","x",1L)): Optional.empty(); }
        @Override public List<PersonaDto> listar() { return List.of(new PersonaDto(1L,"Ana","ana@acme.com","x",1L)); }
        @Override public Optional<PersonaDto> actualizar(Long id, PersonaDto dto) { return Optional.of(new PersonaDto(id, dto.getName(), dto.getEmail(), dto.getPassword(), dto.getOrganizationId())); }
        @Override public boolean eliminar(Long id) { return id != 404L; }
    }

    @Test
    void flow_basico() {
        PersonaController c = new PersonaController(new PersonaServiceStub());
        ResponseEntity<PersonaDto> created = c.create(new PersonaDto(null,"Ana","ana@acme.com","x",1L));
        assertEquals(201, created.getStatusCode().value());
        assertEquals(1L, created.getBody().getId());
        assertEquals(204, c.delete(1L).getStatusCode().value());
        assertEquals(404, c.delete(404L).getStatusCode().value());
    }
}
