package StructuralHorizon.features.project.models;

import org.springframework.stereotype.Component;

@Component
public class ProjectMapper {
	public static ProjectDto mapToDto(ProjectEntity request) {
		ProjectDto.ProjectDtoBuilder builder = ProjectDto.builder()
				.id(request.getId());
		// .number(request.getNumber())
		// .location(request.getLocation());

		// if (request.getProjects() != null) {
		// builder.projects(request.getProjects()
		// .stream()
		// .map(Project::getId)
		// .collect(Collectors.toList()));
		// } else {
		// builder.projects(Collections.emptyList());
		// }

		return builder.build();
	}

	public static ProjectEntity mapToEntity(NewProjectDto request) {
		return ProjectEntity
				.builder()
				// .number(request.getNumber())
				// .location(request.getLocation())
				.build();
	}
}
