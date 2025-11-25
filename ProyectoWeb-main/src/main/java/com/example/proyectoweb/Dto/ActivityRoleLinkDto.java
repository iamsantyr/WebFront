package com.example.proyectoweb.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActivityRoleLinkDto {
    private Long id;
    private Long actividadId;
    private Long roleId;
}