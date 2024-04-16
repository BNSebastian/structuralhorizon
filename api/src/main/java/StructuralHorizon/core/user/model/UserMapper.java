package StructuralHorizon.core.user.model;

import org.springframework.stereotype.Component;

@Component
public class UserMapper {
	public static UserDto mapToDto(UserEntity entry) {
		UserDto.UserDtoBuilder builder = UserDto
				.builder()
				.id(entry.getId())
				.name(entry.getName());

		// if (entry.getProjects() != null) {
		// builder.projects(entry
		// .getProjects()
		// .stream()
		// .map(Project::getId)
		// .collect(Collectors.toList()));
		// }
		return builder.build();
	}

	public static UserEntity mapToEntity(UserCreateDto request) {
		return UserEntity
				.builder()
				.email(request.getEmail())
				.name(request.getName())
				.role(request.getRole())
				.build();
	}
}
