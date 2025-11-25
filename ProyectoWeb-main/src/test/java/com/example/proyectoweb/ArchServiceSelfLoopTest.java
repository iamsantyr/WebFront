package com.example.proyectoweb;

import com.example.proyectoweb.Dto.ArchDto;
import com.example.proyectoweb.Servicio.ArchService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
public class ArchServiceSelfLoopTest {

    @Test
    void crear_conMismoOrigenYDestino_debeFallar() {
        ArchService service = new ArchService(null, null); // repos no usados en este caso
        ArchDto input = new ArchDto(null, 7L, 7L);

        RuntimeException ex = assertThrows(RuntimeException.class, () -> service.crear(input));
        assertTrue(ex.getMessage().toLowerCase().contains("origen y destino no pueden ser iguales"));
    }
}
