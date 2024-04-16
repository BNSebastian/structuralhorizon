package StructuralHorizon.core.auth;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import StructuralHorizon.core.auth.models.AuthenticationRequest;
import StructuralHorizon.core.auth.models.AuthenticationResponse;
import StructuralHorizon.core.auth.models.RegisterRequest;
import StructuralHorizon.core.user.UserRepository;
import StructuralHorizon.core.user.model.Role;
import StructuralHorizon.core.user.model.UserEntity;

import java.util.Optional;
import java.util.UUID;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthenticationService {
	private final UserRepository repository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;

	public AuthenticationResponse register(RegisterRequest request) {

		if (repository.findByEmail(request.getEmail()).isPresent()) {
			throw new RuntimeException();
		}

		if (repository.findByName(request.getName()).isPresent()) {
			throw new RuntimeException();
		}

		var user = UserEntity
				.builder()
				.name(request.getName())
				.email(request.getEmail())
				.password(passwordEncoder.encode(request.getPassword()))
				.role(Role.USER)
				.build();

		if (user == null) {
			throw new RuntimeException();
		}

		var savedUser = repository.save(user);

		var jwtToken = jwtService.generateToken(savedUser);

		return AuthenticationResponse.builder()
				.id(user.getId())
				.email(user.getEmail())
				.name(user.getName())
				.token(jwtToken)
				.build();
	}

	public AuthenticationResponse authenticate(AuthenticationRequest request) {
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						request.getEmail(),
						request.getPassword()));

		var user = repository
				.findByEmail(request.getEmail())
				.orElseThrow();

		var jwtToken = jwtService.generateToken(user);

		return AuthenticationResponse.builder()
				.id(user.getId())
				.email(user.getEmail())
				.name(user.getName())
				.token(jwtToken)
				.build();
	}

	public Boolean isEmailAvailable(String email) {
		if (!repository.findByEmail(email).isPresent()) {
			log.info("isEmailAvailable:: email '{}' available", email);
			return true;
		} else {
			log.warn("isEmailAvailable:: email '{}' not available", email);
			return false;
		}
	}

	public Boolean isNameAvailable(String name) {
		if (!repository.findByName(name).isPresent()) {
			log.info("isNameAvailable:: name '{}' available", name);
			return true;
		} else {
			log.warn("isNameAvailable:: name '{}' not available", name);
			return false;
		}
	}

	public Optional<Role> getRole(UUID id) {
		if (id == null) {
			log.error("getRole:: id is null");
			return Optional.empty();
		}

		Optional<UserEntity> entityOptional = repository.findById(id);

		return entityOptional.map(entity -> {
			log.info("getRole: entity with id '{}' is '{}'", id, entity.getRole());
			return Optional.of(entity.getRole());
		}).orElseGet(() -> {
			log.error("getRole: could not retrieve entity with id: {}", id);
			return Optional.empty();
		});
	}
}
