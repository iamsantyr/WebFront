// Modelo Historial de Proceso
package com.example.proyectoweb.Modelo;

import com.example.proyectoweb.common.ProcessStatus;
import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="ProcessHistory", indexes = @Index(name="idx_ph_proceso", columnList="proceso_id"))
public class ProcessHistory {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional=false, fetch=FetchType.LAZY)
    @JoinColumn(name="proceso_id", foreignKey=@ForeignKey(name="fk_ph_proceso"))
    private Proceso proceso;

    @Column(name="changed_by", length=100)
    private String changedBy; // email/usuario

    @Enumerated(EnumType.STRING)
    @Column(name="status", nullable=false, length=20)
    private ProcessStatus status;

    @Column(name="description_snapshot", length=1500)
    private String descriptionSnapshot;

    @Column(name="created_at", nullable=false)
    private Instant createdAt = Instant.now();
}
