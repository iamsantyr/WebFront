// DTOs Proceso/Historial/Rol
package com.example.proyectoweb.Dto;

import com.example.proyectoweb.common.ProcessStatus;
import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProcesoDto {
    private Long id;
    private String name;
    private String description;
    private String category;
    private ProcessStatus status;
    private Long organizationId;
    private List<Long> activityIds;
    private List<Long> archIds;
    private List<Long> gatewayIds;
}
