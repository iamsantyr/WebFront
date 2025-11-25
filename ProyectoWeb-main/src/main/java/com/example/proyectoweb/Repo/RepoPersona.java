package com.example.proyectoweb.Repo;

import com.example.proyectoweb.Modelo.Persona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface RepoPersona extends JpaRepository<Persona, Long> {
    Optional<Persona> findByEmailIgnoreCase(String email);

}
