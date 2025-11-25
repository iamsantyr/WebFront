package com.example.proyectoweb.Repo;

import com.example.proyectoweb.Modelo.Gateway;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepoGateway extends JpaRepository<Gateway,Long> {}
