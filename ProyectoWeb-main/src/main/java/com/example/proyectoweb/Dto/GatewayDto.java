package com.example.proyectoweb.Dto;

import com.example.proyectoweb.common.GatewayType;
import lombok.*;
import java.util.List;

@Data @AllArgsConstructor @NoArgsConstructor
public class GatewayDto {
    private Long id;
    private GatewayType type;
    private List<Long> archIds;
    private String conditionsJson;
}
