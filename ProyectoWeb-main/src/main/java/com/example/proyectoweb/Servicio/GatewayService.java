package com.example.proyectoweb.Servicio;

import com.example.proyectoweb.Dto.GatewayDto;
import com.example.proyectoweb.Modelo.Arch;
import com.example.proyectoweb.Modelo.Gateway;
import com.example.proyectoweb.Repo.RepoArch;
import com.example.proyectoweb.Repo.RepoGateway;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;
import java.util.stream.Collectors;

import static com.example.proyectoweb.common.DomainExceptions.*;

@Service
@RequiredArgsConstructor
public class GatewayService {

    private final RepoGateway repo;
    private final RepoArch repoArch;

    @Transactional
    public GatewayDto crear(GatewayDto dto) {
        Gateway e = new Gateway();
        e.setType(Objects.requireNonNull(dto.getType(), "type requerido"));
        e.setConditionsJson(dto.getConditionsJson());
        if (dto.getArchIds()!=null && !dto.getArchIds().isEmpty())
            e.setArchs(resolveArchList(dto.getArchIds()));
        return toDto(repo.save(e));
    }

    @Transactional(readOnly = true)
    public Optional<GatewayDto> obtener(Long id) {
        return repo.findById(id).map(this::toDto);
    }

    @Transactional(readOnly = true)
    public List<GatewayDto> listar() {
        return repo.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Transactional
    public Optional<GatewayDto> actualizar(Long id, GatewayDto dto) {
        return repo.findById(id).map(existing -> {
            if (dto.getType()!=null) existing.setType(dto.getType());
            if (dto.getConditionsJson()!=null) existing.setConditionsJson(dto.getConditionsJson());
            if (dto.getArchIds()!=null) existing.setArchs(resolveArchList(dto.getArchIds()));
            return toDto(repo.save(existing));
        });
    }

    @Transactional
    public boolean eliminar(Long id) {
        if (!repo.existsById(id)) return false;
        repo.deleteById(id);
        return true;
    }

    private GatewayDto toDto(Gateway e) {
        List<Long> archIds = (e.getArchs()==null)? List.of()
                : e.getArchs().stream().map(Arch::getId).collect(Collectors.toList());
        return new GatewayDto(e.getId(), e.getType(), archIds, e.getConditionsJson());
    }

    private List<Arch> resolveArchList(List<Long> ids) {
        if (ids==null || ids.isEmpty()) return new ArrayList<>();
        List<Arch> list = new ArrayList<>(ids.size());
        for (Long id : ids) {
            Arch arch = repoArch.findById(id).orElseThrow(() -> new NotFound("No existe Arch id="+id));
            list.add(arch);
        }
        return list;
    }
}
