package com.example.proyectoweb.Repo;

import com.example.proyectoweb.Modelo.Proceso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository public interface RepoProceso extends JpaRepository<Proceso,Long> {
    List<Proceso> findAllByOrganization_Id(Long orgId);
}