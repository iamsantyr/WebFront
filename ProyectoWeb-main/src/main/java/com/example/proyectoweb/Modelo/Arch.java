package com.example.proyectoweb.Modelo;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Arch",
        indexes = {
                @Index(name="idx_arch_ai", columnList = "actividad_i_id"),
                @Index(name="idx_arch_ad", columnList = "actividad_d_id")
        })
public class Arch {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name="actividad_i_id", nullable=false,
            foreignKey = @ForeignKey(name="fk_arch_actividad_i"))
    private Actividad actividadI;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name="actividad_d_id", nullable=false,
            foreignKey = @ForeignKey(name="fk_arch_actividad_d"))
    private Actividad actividadD;
}
