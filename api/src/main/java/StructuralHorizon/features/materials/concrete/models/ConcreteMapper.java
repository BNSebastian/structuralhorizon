package StructuralHorizon.features.materials.concrete.models;

import org.springframework.stereotype.Component;

@Component
public class ConcreteMapper {
	public static ConcreteDto mapToDto(Concrete request) {
		ConcreteDto.ConcreteDtoBuilder builder = ConcreteDto.builder()
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

	public static Concrete mapToEntity(ConcreteCreateDto request) {
		return Concrete
				.builder()
				.number(request.getNumber())
				.location(request.getLocation())
				.build();
	}
}