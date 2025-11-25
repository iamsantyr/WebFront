package com.example.proyectoweb.Servicio;

import com.example.proyectoweb.Dto.PersonaDto;
import com.example.proyectoweb.Modelo.Organization;
import com.example.proyectoweb.Modelo.Persona;
import com.example.proyectoweb.Repo.RepoOrganization;
import com.example.proyectoweb.Repo.RepoPersona;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;

import static com.example.proyectoweb.common.DomainExceptions.*;

@Service
@RequiredArgsConstructor
public class PersonaService {

    private final RepoPersona repo;
    private final RepoOrganization repoOrg;
    private final ModelMapper mapper;

    @Transactional
    public PersonaDto crear(PersonaDto dto) {
        Persona e = mapper.map(dto, Persona.class);
        e.setId(null);
        if (dto.getOrganizationId() != null) {
            Organization org = repoOrg.findById(dto.getOrganizationId())
                    .orElseThrow(() -> new NotFound("Organización no encontrada"));
            e.setOrganization(org);
        }
        e = repo.save(e);
        return toDto(e);
    }

    @Transactional
    public Optional<PersonaDto> obtener(Long id) {
        return repo.findById(id).map(this::toDto);
    }
    @Transactional(readOnly = true)
    public List<PersonaDto> listar() {
        List<PersonaDto> out = new ArrayList<>();
        for (Persona e : repo.findAll()) out.add(toDto(e));
        return out;
    }

    @Transactional
    public Optional<PersonaDto> actualizar(Long id, PersonaDto dto) {
        return repo.findById(id).map(existing -> {
            existing.setName(dto.getName());
            existing.setEmail(dto.getEmail());
            existing.setPassword(dto.getPassword());
            if (dto.getOrganizationId() != null) {
                Organization org = repoOrg.findById(dto.getOrganizationId())
                        .orElseThrow(() -> new NotFound("Organización no encontrada"));
                existing.setOrganization(org);
            }
            return toDto(repo.save(existing));
        });
    }

    @Transactional
    public boolean eliminar(Long id) {
        if (!repo.existsById(id)) return false;
        repo.deleteById(id);
        return true;
    }

    @Transactional(readOnly = true)
    public Optional<PersonaDto> obtenerPorEmail(String email) {
        return repo.findByEmailIgnoreCase(email).map(this::toDto);
    }

    private PersonaDto toDto(Persona e){
        PersonaDto dto = mapper.map(e, PersonaDto.class);
        dto.setOrganizationId(e.getOrganization()!=null? e.getOrganization().getId(): null);
        return dto;
    }
}
