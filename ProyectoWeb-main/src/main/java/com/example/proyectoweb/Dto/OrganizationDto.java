package com.example.proyectoweb.Dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrganizationDto {
    private  Long id;
    private String name;
    private String nit;
    private String email;
}
