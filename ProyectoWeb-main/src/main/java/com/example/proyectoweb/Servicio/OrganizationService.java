package com.example.proyectoweb.Servicio;

import com.example.proyectoweb.Dto.OrganizationDto;
import com.example.proyectoweb.Modelo.Organization;
import com.example.proyectoweb.Repo.RepoOrganization;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;

@Service
@RequiredArgsConstructor
public class OrganizationService {

    private final RepoOrganization repo;
    private final ModelMapper mapper;

    @Transactional
    public OrganizationDto crear(OrganizationDto dto) {
        Organization e = mapper.map(dto, Organization.class);
        e.setId(null);
        e = repo.save(e);
        return mapper.map(e, OrganizationDto.class);
    }

    @Transactional(readOnly = true)
    public Optional<OrganizationDto> obtener(Long id) {
        return repo.findById(id).map(e -> mapper.map(e, OrganizationDto.class));
    }

    @Transactional(readOnly = true)
    public List<OrganizationDto> listar() {
        List<OrganizationDto> out = new ArrayList<>();
        for (Organization e : repo.findAll()) out.add(mapper.map(e, OrganizationDto.class));
        return out;
    }

    @Transactional
    public Optional<OrganizationDto> actualizar(Long id, OrganizationDto dto) {
        return repo.findById(id).map(existing -> {
            existing.setName(dto.getName());
            existing.setNit(dto.getNit());
            existing.setEmail(dto.getEmail());
            return mapper.map(repo.save(existing), OrganizationDto.class);
        });
    }

    @Transactional
    public boolean eliminar(Long id) {
        if (!repo.existsById(id)) return false;
        repo.deleteById(id);
        return true;
    }
}
