package com.example.proyectoweb.Dto;

import lombok.*;

@Data @NoArgsConstructor @AllArgsConstructor
public class ActivityDto {
    private Long id;
    private String name;
    private String type;
    private String description;
    private Integer x;
    private Integer y;
}
