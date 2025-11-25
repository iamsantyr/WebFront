package com.example.proyectoweb.Modelo;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="ActivityRoleLink",
        uniqueConstraints = @UniqueConstraint(name="uk_activity_role", columnNames={"actividad_id","role_id"}))
public class ActivityRoleLink {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional=false, fetch=FetchType.LAZY)
    @JoinColumn(name="actividad_id", foreignKey=@ForeignKey(name="fk_arlink_act"))
    private Actividad actividad;

    @ManyToOne(optional=false, fetch=FetchType.LAZY)
    @JoinColumn(name="role_id", foreignKey=@ForeignKey(name="fk_arlink_role"))
    private ProcessRole role;
}
