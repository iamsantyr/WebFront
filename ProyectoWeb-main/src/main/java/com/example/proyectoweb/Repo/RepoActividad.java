package com.example.proyectoweb.Repo;

import com.example.proyectoweb.Modelo.Actividad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepoActividad extends JpaRepository<Actividad, Long> {}
