package com.example.proyectoweb.Servicio;

import com.example.proyectoweb.Dto.ActivityDto;
import com.example.proyectoweb.Modelo.Actividad;
import com.example.proyectoweb.Modelo.Arch;
import com.example.proyectoweb.Repo.RepoActividad;
import com.example.proyectoweb.Repo.RepoArch;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ActividadService {

    private final RepoActividad repo;
    private final RepoArch repoArch;
    private final ModelMapper mapper;

    @Transactional
    public ActivityDto crear(ActivityDto dto) {
        Actividad entity = mapper.map(dto, Actividad.class);
        entity.setId(null);
        return mapper.map(repo.save(entity), ActivityDto.class);
    }

    @Transactional(readOnly = true)
    public Optional<ActivityDto> obtener(Long id) {
        return repo.findById(id).map(e -> mapper.map(e, ActivityDto.class));
    }

    @Transactional(readOnly = true)
    public List<ActivityDto> listar() {
        List<ActivityDto> out = new ArrayList<>();
        for (Actividad e : repo.findAll()) out.add(mapper.map(e, ActivityDto.class));
        return out;
    }

    @Transactional
    public Optional<ActivityDto> actualizar(Long id, ActivityDto dto) {
        return repo.findById(id).map(existing -> {
            existing.setName(dto.getName());
            existing.setType(dto.getType());
            existing.setDescription(dto.getDescription());
            return mapper.map(repo.save(existing), ActivityDto.class);
        });
    }

    @Transactional
    public boolean eliminar(Long id) {
        return repo.findById(id).map(act -> {
            List<Arch> relacionados = repoArch.findAllByActividadI_IdOrActividadD_Id(id, id);
            repoArch.deleteAll(relacionados);
            repo.delete(act);
            return true;
        }).orElse(false);
    }
}
