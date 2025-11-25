package com.example.proyectoweb.Repo;

import com.example.proyectoweb.Modelo.ProcessHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepoProcessHistory extends JpaRepository<ProcessHistory, Long> {
    List<ProcessHistory> findAllByProceso_IdOrderByCreatedAtDesc(Long procesoId);
}