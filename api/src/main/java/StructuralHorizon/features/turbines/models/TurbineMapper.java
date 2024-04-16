package StructuralHorizon.features.turbines.models;

import org.springframework.stereotype.Component;

@Component
public class TurbineMapper {
	public static TurbineDto mapToDto(Turbine request) {
		TurbineDto.TurbineDtoBuilder builder = TurbineDto.builder()
				.id(request.getId())
				.number(request.getNumber())
				.location(request.getLocation());

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

	public static Turbine mapToEntity(TurbineCreateDto request) {
		return Turbine
				.builder()
				.number(request.getNumber())
				.location(request.getLocation())
				.build();
	}
}
