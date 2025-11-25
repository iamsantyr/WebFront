package com.example.proyectoweb.Modelo;

import com.example.proyectoweb.common.ProcessStatus;
import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Proceso")
public class Proceso {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name", nullable=false, length=100)
    private String name;

    @Column(name="description", nullable=false, length=1000)
    private String description;

    @Column(name="category", nullable=false, length=100)
    private String category;

    @Enumerated(EnumType.STRING)
    @Column(name="status", nullable=false, length=20)
    private ProcessStatus status = ProcessStatus.DRAFT;

    // Vinculado a una organización
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="organization_id", foreignKey = @ForeignKey(name="fk_proceso_org"))
    private Organization organization;

    // Relaciones unidireccionales por tablas intermedias
    @OneToMany
    @JoinTable(name="proceso_actividad",
            joinColumns=@JoinColumn(name="proceso_id", foreignKey=@ForeignKey(name="fk_proc_act_proc")),
            inverseJoinColumns=@JoinColumn(name="actividad_id", foreignKey=@ForeignKey(name="fk_proc_act_act")))
    private List<Actividad> activities = new ArrayList<>();

    @OneToMany
    @JoinTable(name="proceso_arch",
            joinColumns=@JoinColumn(name="proceso_id", foreignKey=@ForeignKey(name="fk_proc_arch_proc")),
            inverseJoinColumns=@JoinColumn(name="arch_id", foreignKey=@ForeignKey(name="fk_proc_arch_arch")))
    private List<Arch> archs = new ArrayList<>();

    @OneToMany
    @JoinTable(name="proceso_gateway",
            joinColumns=@JoinColumn(name="proceso_id", foreignKey=@ForeignKey(name="fk_proc_gw_proc")),
            inverseJoinColumns=@JoinColumn(name="gateway_id", foreignKey=@ForeignKey(name="fk_proc_gw_gw")))
    private List<Gateway> gateways = new ArrayList<>();
}
