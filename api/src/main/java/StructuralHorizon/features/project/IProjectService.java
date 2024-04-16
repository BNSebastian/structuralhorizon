package StructuralHorizon.features.project;

import StructuralHorizon.features.project.models.ProjectCreateDto;
import StructuralHorizon.features.project.models.ProjectDto;
import StructuralHorizon.features.project.models.ProjectUpdateDto;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface IProjectService {
    Optional<ProjectDto> save(ProjectCreateDto request);

    Optional<List<ProjectDto>> getAll();

    Optional<ProjectDto> getById(UUID id);

    Optional<ProjectDto> update(ProjectUpdateDto request);

    Boolean delete(UUID id);

    Page<ProjectDto> getPage(int pageIndex, int pageSize);
}
