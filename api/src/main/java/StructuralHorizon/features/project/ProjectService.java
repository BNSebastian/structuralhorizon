package StructuralHorizon.features.project;

import StructuralHorizon.features.project.models.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
public class ProjectService implements IProjectService {

    @Autowired
    private IProjectRepository repository;

    @Override
    public Optional<ProjectDto> save(NewProjectDto request) {
        if (request != null) {
            ProjectEntity pendingEntity = ProjectMapper.mapToEntity(request);
            if (pendingEntity != null) {
                ProjectEntity savedEntity = repository.save(pendingEntity);
                log.info("save:: created entity with id: {}", savedEntity.getId());
                return Optional.of(ProjectMapper.mapToDto(savedEntity));
            } else {
                log.error("save:: could not map request to entity");
                return Optional.empty();
            }
        } else {
            log.error("save:: invalid request");
            return Optional.empty();
        }
    }

    @Override
    public Optional<List<ProjectDto>> getAll() {
        List<ProjectEntity> entries = repository.findAll();
        log.info("getAll:: retrieving all entities");
        return Optional.of(entries
                .stream()
                .map(ProjectMapper::mapToDto)
                .collect(Collectors.toList()));
    }

    @Override
    public Optional<ProjectDto> getById(UUID id) {
        if (id == null) {
            log.error("getById:: id is null");
            return Optional.empty();
        }

        Optional<ProjectEntity> entityOptional = repository.findById(id);

        return entityOptional.map(entity -> {
            log.info("getById:: retrieved entity with id: {}", id);
            return Optional.of(ProjectMapper.mapToDto(entity));
        }).orElseGet(() -> {
            log.error("getById:: could not retrieve entity with id: {}", id);
            return Optional.empty();
        });
    }

    @Override
    public Optional<ProjectDto> update(UpdateProjectDto request) {
        if (request == null) {
            log.error("update:: invalid request");
            return Optional.empty();
        }

        UUID id = request.getId();

        if (id == null) {
            log.error("update:: id is null");
            return Optional.empty();
        }

        Optional<ProjectEntity> optionalTurbine = repository.findById(id);

        if (optionalTurbine.isPresent()) {
            ProjectEntity existingEntity = optionalTurbine.get();
            // TODO: add entity specific parameters
            ProjectEntity updatedEntity = repository.save(existingEntity);

            log.info("update:: entity with id: {} updated", updatedEntity.getId());
            return Optional.of(ProjectMapper.mapToDto(updatedEntity));
        } else {
            log.error("update:: entity with id {} not found", id);
            return Optional.empty();
        }
    }

    @Override
    public Boolean delete(UUID id) {
        if (id == null) {
            log.error("delete:: id is null");
            return false;
        }

        Optional<ProjectEntity> entityOptional = repository.findById(id);

        return entityOptional.map(entity -> {
            repository.delete(entity);
            log.info("delete:: deleted entity with id: {}", id);
            return true;
        }).orElseGet(() -> {
            log.error("delete:: could not delete entity with id: {}", id);
            return false;
        });
    }

    public Page<ProjectDto> getPage(int pageIndex, int pageSize) {
        Page<ProjectEntity> page = repository.findAll(PageRequest.of(pageIndex, pageSize));
        log.info("getPage:: returning page with index '{}' and size '{}'", pageIndex, pageSize);
        return page.map(ProjectMapper::mapToDto);
    }

}
