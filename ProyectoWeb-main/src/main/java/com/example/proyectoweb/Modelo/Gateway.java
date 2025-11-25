package com.example.proyectoweb.Modelo;

import com.example.proyectoweb.common.GatewayType;
import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Gateway")
public class Gateway {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name="type", nullable=false, length=20)
    private GatewayType type;

    @OneToMany
    @JoinTable(
            name = "gateway_arch",
            joinColumns = @JoinColumn(name = "gateway_id", foreignKey=@ForeignKey(name="fk_gateway_arch_gateway")),
            inverseJoinColumns = @JoinColumn(name = "arch_id", foreignKey=@ForeignKey(name="fk_gateway_arch_arch"))
    )
    private List<Arch> archs = new ArrayList<>();

    @Column(name="conditions_json", length=2000)
    private String conditionsJson;
}
