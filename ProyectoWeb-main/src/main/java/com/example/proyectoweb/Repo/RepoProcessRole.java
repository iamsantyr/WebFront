package com.example.proyectoweb.Repo;
import com.example.proyectoweb.Modelo.ProcessRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepoProcessRole extends JpaRepository<ProcessRole, Long> {
    List<ProcessRole> findAllByOrganization_Id(Long orgId);
    boolean existsByIdAndOrganization_Id(Long id, Long orgId);
}