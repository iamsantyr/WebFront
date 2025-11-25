package com.example.proyectoweb.Dto;

import com.example.proyectoweb.common.ProcessStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProcessHistoryDto {
    private Long id;
    private Long procesoId;
    private String changedBy;
    private ProcessStatus status;
    private String descriptionSnapshot;
    private Long createdAtEpoch;
}