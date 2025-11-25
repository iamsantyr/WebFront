package com.example.proyectoweb.Servicio;

import com.example.proyectoweb.Dto.ProcesoDto;
import com.example.proyectoweb.Modelo.*;
import com.example.proyectoweb.Repo.*;
import com.example.proyectoweb.common.ProcessStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;
import java.util.stream.Collectors;

import static com.example.proyectoweb.common.DomainExceptions.*;

@Service
@RequiredArgsConstructor
public class ProcesoService {

    private final RepoProceso repo;
    private final RepoOrganization repoOrg;
    private final RepoActividad repoActividad;
    private final RepoArch repoArch;
    private final RepoGateway repoGateway;
    private final RepoProcessHistory repoHistory;

    @Transactional
    public ProcesoDto crear(ProcesoDto dto, String actorEmail) {
        Proceso p = new Proceso();
        p.setId(null);
        p.setName(dto.getName());
        p.setDescription(dto.getDescription());
        p.setCategory(dto.getCategory());
        p.setStatus(dto.getStatus() != null ? dto.getStatus() : ProcessStatus.DRAFT);

        if (dto.getOrganizationId()!=null) {
            Organization org = repoOrg.findById(dto.getOrganizationId())
                    .orElseThrow(() -> new NotFound("Organización no encontrada"));
            p.setOrganization(org);
        }

        if (dto.getActivityIds()!=null) p.setActivities(resolveActivities(dto.getActivityIds()));
        if (dto.getArchIds()!=null) p.setArchs(resolveArches(dto.getArchIds()));
        if (dto.getGatewayIds()!=null) p.setGateways(resolveGateways(dto.getGatewayIds()));

        p = repo.save(p);
        addHistory(p, actorEmail, "Creación");

        return toDto(p);
    }

    @Transactional(readOnly = true)
    public Optional<ProcesoDto> obtener(Long id) {
        return repo.findById(id).map(this::toDto);
    }

    @Transactional(readOnly = true)
    public List<ProcesoDto> listar(Long orgId, ProcessStatus status) {
        List<Proceso> base = (orgId!=null)? repo.findAllByOrganization_Id(orgId) : repo.findAll();
        if (status != null) base = base.stream().filter(p -> p.getStatus()==status).collect(Collectors.toList());
        return base.stream().map(this::toDto).collect(Collectors.toList());
    }

    @Transactional
    public Optional<ProcesoDto> actualizar(Long id, ProcesoDto dto, String actorEmail) {
        return repo.findById(id).map(existing -> {
            if (dto.getName()!=null) existing.setName(dto.getName());
            if (dto.getDescription()!=null) existing.setDescription(dto.getDescription());
            if (dto.getCategory()!=null) existing.setCategory(dto.getCategory());
            if (dto.getStatus()!=null) existing.setStatus(dto.getStatus());
            if (dto.getOrganizationId()!=null) {
                Organization org = repoOrg.findById(dto.getOrganizationId())
                        .orElseThrow(() -> new NotFound("Organización no encontrada"));
                existing.setOrganization(org);
            }
            if (dto.getActivityIds()!=null) existing.setActivities(resolveActivities(dto.getActivityIds()));
            if (dto.getArchIds()!=null) existing.setArchs(resolveArches(dto.getArchIds()));
            if (dto.getGatewayIds()!=null) existing.setGateways(resolveGateways(dto.getGatewayIds()));

            Proceso saved = repo.save(existing);
            addHistory(saved, actorEmail, "Actualización");
            return toDto(saved);
        });
    }

    @Transactional
    public boolean eliminar(Long id, boolean hardDelete, String actorEmail) {
        return repo.findById(id).map(p -> {
            if (!hardDelete && p.getStatus()==ProcessStatus.PUBLISHED) {
                p.setStatus(ProcessStatus.INACTIVE);
                repo.save(p);
                addHistory(p, actorEmail, "Soft delete (INACTIVE)");
            } else {
                repo.delete(p);
            }
            return true;
        }).orElse(false);
    }

    @Transactional(readOnly = true)
    public List<ProcessHistory> historial(Long procesoId) {
        return repoHistory.findAllByProceso_IdOrderByCreatedAtDesc(procesoId);
    }


    private List<Actividad> resolveActivities(List<Long> ids){
        if (ids==null) return new ArrayList<>();
        List<Actividad> out = new ArrayList<>(ids.size());
        for (Long id: ids) {
            out.add(repoActividad.findById(id).orElseThrow(() -> new NotFound("Actividad no existe: "+id)));
        }
        return out;
    }
    private List<Arch> resolveArches(List<Long> ids){
        if (ids==null) return new ArrayList<>();
        List<Arch> out = new ArrayList<>(ids.size());
        for (Long id: ids) {
            out.add(repoArch.findById(id).orElseThrow(() -> new NotFound("Arch no existe: "+id)));
        }
        return out;
    }
    private List<Gateway> resolveGateways(List<Long> ids){
        if (ids==null) return new ArrayList<>();
        List<Gateway> out = new ArrayList<>(ids.size());
        for (Long id: ids) {
            out.add(repoGateway.findById(id).orElseThrow(() -> new NotFound("Gateway no existe: "+id)));
        }
        return out;
    }

    private void addHistory(Proceso p, String actorEmail, String reason) {
        ProcessHistory h = new ProcessHistory();
        h.setProceso(p);
        h.setChangedBy(actorEmail!=null? actorEmail : reason);
        h.setStatus(p.getStatus());
        h.setDescriptionSnapshot(p.getDescription());
        repoHistory.save(h);
    }

    private ProcesoDto toDto(Proceso p){
        ProcesoDto dto = new ProcesoDto();
        dto.setId(p.getId());
        dto.setName(p.getName());
        dto.setDescription(p.getDescription());
        dto.setCategory(p.getCategory());
        dto.setStatus(p.getStatus());
        dto.setOrganizationId(p.getOrganization()!=null? p.getOrganization().getId(): null);
        dto.setActivityIds(p.getActivities().stream().map(Actividad::getId).collect(Collectors.toList()));
        dto.setArchIds(p.getArchs().stream().map(Arch::getId).collect(Collectors.toList()));
        dto.setGatewayIds(p.getGateways().stream().map(Gateway::getId).collect(Collectors.toList()));
        return dto;
    }
}
