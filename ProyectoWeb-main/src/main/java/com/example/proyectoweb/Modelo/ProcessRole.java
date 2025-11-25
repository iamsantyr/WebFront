package com.example.proyectoweb.Modelo;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="ProcessRole",
        uniqueConstraints = @UniqueConstraint(name="uk_role_name_org", columnNames={"name","organization_id"}))
public class ProcessRole {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name", nullable=false, length=100)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="organization_id", foreignKey=@ForeignKey(name="fk_role_org"))
    private Organization organization;
}
