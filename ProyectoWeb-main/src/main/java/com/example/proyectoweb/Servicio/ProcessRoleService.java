package com.example.proyectoweb.Servicio;

import com.example.proyectoweb.Dto.ActivityRoleLinkDto;
import com.example.proyectoweb.Dto.ProcessRoleDto;
import com.example.proyectoweb.Modelo.*;
import com.example.proyectoweb.Repo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;
import java.util.stream.Collectors;

import static com.example.proyectoweb.common.DomainExceptions.*;

@Service
@RequiredArgsConstructor
public class ProcessRoleService {

    private final RepoProcessRole repoRole;
    private final RepoOrganization repoOrg;
    private final RepoActividad repoActividad;
    private final RepoActivityRoleLink repoLink;
    private final RepoProceso repoProceso;

    @Transactional
    public ProcessRoleDto crear(ProcessRoleDto dto) {
        ProcessRole r = new ProcessRole();
        r.setId(null);
        r.setName(dto.getName());
        if (dto.getOrganizationId()!=null) {
            Organization org = repoOrg.findById(dto.getOrganizationId())
                    .orElseThrow(() -> new NotFound("Organización no encontrada"));
            r.setOrganization(org);
        }
        r = repoRole.save(r);
        return new ProcessRoleDto(r.getId(), r.getName(),
                r.getOrganization()!=null? r.getOrganization().getId(): null);
    }

    @Transactional(readOnly = true)
    public List<ProcessRoleDto> listar(Long orgId) {
        return (orgId!=null? repoRole.findAllByOrganization_Id(orgId) : repoRole.findAll())
                .stream().map(r -> new ProcessRoleDto(r.getId(), r.getName(),
                        r.getOrganization()!=null? r.getOrganization().getId(): null))
                .collect(Collectors.toList());
    }

    @Transactional
    public Optional<ProcessRoleDto> actualizar(Long id, ProcessRoleDto dto) {
        return repoRole.findById(id).map(existing -> {
            if (dto.getName()!=null) existing.setName(dto.getName());
            if (dto.getOrganizationId()!=null) {
                Organization org = repoOrg.findById(dto.getOrganizationId())
                        .orElseThrow(() -> new NotFound("Organización no encontrada"));
                existing.setOrganization(org);
            }
            ProcessRole saved = repoRole.save(existing);
            return new ProcessRoleDto(saved.getId(), saved.getName(),
                    saved.getOrganization()!=null? saved.getOrganization().getId(): null);
        });
    }

    @Transactional
    public boolean eliminar(Long id) {
        if (!repoRole.existsById(id)) return false;
        if (repoLink.existsByRole_Id(id))
            throw new Conflict("No se puede eliminar: el rol está en uso por una o más actividades");
        repoRole.deleteById(id);
        return true;
    }

    @Transactional
    public ActivityRoleLinkDto asignarRolActividad(Long actividadId, Long roleId) {
        Actividad act = repoActividad.findById(actividadId)
                .orElseThrow(() -> new NotFound("Actividad no encontrada"));
        ProcessRole role = repoRole.findById(roleId)
                .orElseThrow(() -> new NotFound("Rol no encontrado"));

        ActivityRoleLink link = new ActivityRoleLink(null, act, role);
        link = repoLink.save(link);
        return new ActivityRoleLinkDto(link.getId(), act.getId(), role.getId());
    }

    @Transactional(readOnly = true)
    public Map<String, List<Long>> dondeSeUsa(Long roleId) {
        if (!repoRole.existsById(roleId)) throw new NotFound("Rol no encontrado");
        List<ActivityRoleLink> links = repoLink.findAllByRole_Id(roleId);
        List<Long> actividadIds = links.stream().map(l -> l.getActividad().getId()).collect(Collectors.toList());

        Set<Long> procesoIds = new HashSet<>();
        for (Long aid: actividadIds) {
            for (Proceso p : repoProceso.findAll()) {
                boolean used = p.getActivities().stream().anyMatch(a -> a.getId().equals(aid));
                if (used) procesoIds.add(p.getId());
            }
        }
        Map<String, List<Long>> out = new HashMap<>();
        out.put("actividades", actividadIds);
        out.put("procesos", new ArrayList<>(procesoIds));
        return out;
    }
}
