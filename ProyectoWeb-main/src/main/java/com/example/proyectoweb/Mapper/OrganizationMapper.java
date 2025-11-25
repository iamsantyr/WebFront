package com.example.proyectoweb.Mapper;

import com.example.proyectoweb.Dto.OrganizationDto;
import com.example.proyectoweb.Modelo.Organization;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

// Envuelve ModelMapper solo para Organization (centraliza reglas/conversión)
@Component
@RequiredArgsConstructor
public class OrganizationMapper {

    private final ModelMapper mapper;

    // Entidad -> DTO
    public OrganizationDto toDto(Organization org) {
        if (org == null) return null;
        return mapper.map(org, OrganizationDto.class);
    }

    // DTO -> Entidad
    public Organization toEntity(OrganizationDto dto) {
        if (dto == null) return null;
        return mapper.map(dto, Organization.class);
    }
}
