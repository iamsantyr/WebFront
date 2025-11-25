package com.example.proyectoweb.Modelo;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Organization",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_organization_nit", columnNames = "NIT"),
                @UniqueConstraint(name = "uk_organization_email", columnNames = "email")
        })
public class Organization {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name", nullable=false, length=100)
    private String name;

    @Column(name="NIT", nullable=false, length=100)
    private String nit;

    @Column(name="email", nullable=false, length=100)
    private String email;
}
