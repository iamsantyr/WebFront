package com.example.proyectoweb.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProcessRoleDto {
    private Long id;
    private String name;
    private Long organizationId;
}