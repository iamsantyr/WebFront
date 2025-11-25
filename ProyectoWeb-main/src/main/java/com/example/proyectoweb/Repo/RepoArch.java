package com.example.proyectoweb.Repo;

import com.example.proyectoweb.Modelo.Arch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RepoArch extends JpaRepository<Arch, Long> {
    List<Arch> findAllByActividadI_IdOrActividadD_Id(Long actividadIId, Long actividadDId);
}
