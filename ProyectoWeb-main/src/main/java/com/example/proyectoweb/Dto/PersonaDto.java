package com.example.proyectoweb.Dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonaDto {
    private Long id;
    private String name;
    private String email;
    private String password;
    private Long organizationId;
}
