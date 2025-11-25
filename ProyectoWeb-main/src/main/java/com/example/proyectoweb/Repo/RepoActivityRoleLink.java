package com.example.proyectoweb.Repo;

import com.example.proyectoweb.Modelo.ActivityRoleLink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepoActivityRoleLink extends JpaRepository<ActivityRoleLink, Long> {
    boolean existsByRole_Id(Long roleId);
    List<ActivityRoleLink> findAllByRole_Id(Long roleId);
}