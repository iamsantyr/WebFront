package com.example.proyectoweb.Mapper;

import com.example.proyectoweb.Dto.OrganizationDto;
import com.example.proyectoweb.Modelo.Organization;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class Mapper {

    private final ModelMapper mapper;

    public Mapper(ModelMapper mapper) {
        this.mapper = mapper;
    }

    public OrganizationDto ConvertirOrg(Organization org) {
        if (org == null) return null;
        return mapper.map(org, OrganizationDto.class);
    }

    public Organization ConvertirOrg(OrganizationDto dto) {
        if (dto == null) return null;
        return mapper.map(dto, Organization.class);
    }
    //Si se quiere, se puede agregar demas metodos para conversion con el bean de mapper a todos los objetos que tengan DTO

}
