package com.example.proyectoweb.Servicio;

import com.example.proyectoweb.Dto.ArchDto;
import com.example.proyectoweb.Modelo.Actividad;
import com.example.proyectoweb.Modelo.Arch;
import com.example.proyectoweb.Repo.RepoActividad;
import com.example.proyectoweb.Repo.RepoArch;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;

import static com.example.proyectoweb.common.DomainExceptions.*;

@Service
@RequiredArgsConstructor
public class ArchService {

    private final RepoArch repo;
    private final RepoActividad repoActividad;

    @Transactional
    public ArchDto crear(ArchDto dto) {
        if (Objects.equals(dto.getActividadI(), dto.getActividadD()))
            throw new BadRequest("Origen y destino no pueden ser iguales");

        Actividad ai = repoActividad.findById(dto.getActividadI())
                .orElseThrow(() -> new NotFound("Actividad origen no existe"));
        Actividad ad = repoActividad.findById(dto.getActividadD())
                .orElseThrow(() -> new NotFound("Actividad destino no existe"));

        Arch saved = repo.save(new Arch(null, ai, ad));
        return new ArchDto(saved.getId(), ai.getId(), ad.getId());
    }

    @Transactional(readOnly = true)
    public Optional<ArchDto> obtener(Long id) {
        return repo.findById(id).map(e -> new ArchDto(e.getId(),
                e.getActividadI().getId(), e.getActividadD().getId()));
    }

    @Transactional(readOnly = true)
    public List<ArchDto> listar() {
        List<ArchDto> out = new ArrayList<>();
        for (Arch e : repo.findAll())
            out.add(new ArchDto(e.getId(), e.getActividadI().getId(), e.getActividadD().getId()));
        return out;
    }

    @Transactional
    public Optional<ArchDto> actualizar(Long id, ArchDto dto) {
        return repo.findById(id).map(existing -> {
            if (dto.getActividadI()!=null) {
                Actividad ai = repoActividad.findById(dto.getActividadI())
                        .orElseThrow(() -> new NotFound("Actividad origen no existe"));
                existing.setActividadI(ai);
            }
            if (dto.getActividadD()!=null) {
                Actividad ad = repoActividad.findById(dto.getActividadD())
                        .orElseThrow(() -> new NotFound("Actividad destino no existe"));
                existing.setActividadD(ad);
            }
            if (Objects.equals(existing.getActividadI().getId(), existing.getActividadD().getId()))
                throw new BadRequest("Origen y destino no pueden ser iguales");
            Arch saved = repo.save(existing);
            return new ArchDto(saved.getId(), saved.getActividadI().getId(), saved.getActividadD().getId());
        });
    }

    @Transactional
    public boolean eliminar(Long id) {
        if (!repo.existsById(id)) return false;
        repo.deleteById(id);
        return true;
    }
}
