package com.example.proyectoweb.Repo;

import com.example.proyectoweb.Modelo.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepoOrganization extends JpaRepository<Organization,Long> {}
