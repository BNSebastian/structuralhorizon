package StructuralHorizon.core.user;

import lombok.extern.slf4j.Slf4j;
import StructuralHorizon.core.user.model.ChangePasswordRequest;
import StructuralHorizon.core.user.model.UserCreateDto;
import StructuralHorizon.core.user.model.UserDto;
import StructuralHorizon.core.user.model.UserEntity;
import StructuralHorizon.core.user.model.UserMapper;
import StructuralHorizon.core.user.model.UserUpdateDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
public class UserService implements IUserService {
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	/**
	 * Saves a new user.
	 *
	 * @param request the user information to save
	 * @return the saved user, or an empty optional if the user could not be saved
	 */
	public Optional<UserDto> save(UserCreateDto request) {
		if (request != null) {
			if (userRepository.findByEmail(request.getEmail()).isPresent()) {
				throw new RuntimeException();
			}

			if (userRepository.findByName(request.getName()).isPresent()) {
				throw new RuntimeException();
			}

			UserEntity pendingEntity = UserMapper.mapToEntity(request);

			if (pendingEntity != null) {
				pendingEntity.setPassword(passwordEncoder.encode(request.getPassword()));
				UserEntity savedEntity = userRepository.save(pendingEntity);
				log.info("save:: created entity with id: {}", savedEntity.getId());
				return Optional.of(UserMapper.mapToDto(savedEntity));
			} else {
				log.error("save:: could not map request to entity");
				return Optional.empty();
			}
		} else {
			log.error("save:: invalid request");
			return Optional.empty();
		}
	}

	/**
	 * Retrieves all Users.
	 *
	 * @return an optional containing the list of Users, or an empty optional if
	 *         no Users were found
	 */
	@Override
	public Optional<List<UserDto>> getAll() {
		List<UserEntity> users = userRepository.findAll();
		log.info("getAll:: retrieving all entities");
		return Optional.ofNullable(users
				.stream()
				.map(UserMapper::mapToDto)
				.collect(Collectors.toList()));
	}

	/**
	 * Retrieves a user by its ID.
	 *
	 * @param id the ID of the user to retrieve
	 * @return an optional containing the user with the given ID, or an empty
	 *         optional if no user was found with the given ID
	 */
	public Optional<UserDto> getById(UUID id) {
		if (id == null) {
			log.error("getById:: id is null");
			return Optional.empty();
		}

		Optional<UserEntity> entityOptional = userRepository.findById(id);

		return entityOptional.map(entity -> {
			log.info("getById:: retrieved entity with id: {}", id);
			return Optional.of(UserMapper.mapToDto(entity));
		}).orElseGet(() -> {
			log.error("getById:: could not retrieve entity with id: {}", id);
			return Optional.empty();
		});
	}

	/**
	 * Updates an existing user.
	 *
	 * @param request the updated user information
	 * @return the updated user, or an empty optional if the user could not be
	 *         updated
	 */
	@Override
	public Optional<UserDto> update(UserUpdateDto request) {
		if (request == null) {
			log.error("update:: invalid request");
			return Optional.empty();
		}

		UUID id = request.getId();

		if (id == null) {
			log.error("update:: id is null");
			return Optional.empty();
		}

		Optional<UserEntity> entityOptional = userRepository.findById(id);

		if (entityOptional.isPresent()) {
			UserEntity entity = entityOptional.get();

			// Custom implementation of properties
			entity.setEmail(request.getEmail());
			entity.setName(request.getName());

			if (request.getCurrentPassword() != null &&
					request.getNewPassword() != null &&
					request.getConfirmationPassword() != null) {

				if (!passwordEncoder.matches(request.getCurrentPassword(), entity.getPassword())) {
					throw new IllegalStateException("update:: wrong password");
				}

				if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
					throw new IllegalStateException("update:: passwords are not the same");
				}

				entity.setPassword(passwordEncoder.encode(request.getNewPassword()));
			}

			UserEntity updatedEntity = userRepository.save(entity);

			log.info("update:: entity with id: {} updated", updatedEntity.getId());
			return Optional.of(UserMapper.mapToDto(updatedEntity));
		} else {
			log.error("update:: entity with id {} not found", id);
			return Optional.empty();
		}
	}

	/**
	 * Deletes a user by its ID.
	 *
	 * @param id the ID of the user to delete
	 * @return true if the user was deleted, or false if the user could not be found
	 *         or deleted
	 */
	public Boolean delete(UUID id) {
		if (id == null) {
			log.error("delete:: id is null");
			return false;
		}

		Optional<UserEntity> entityOptional = userRepository.findById(id);

		return entityOptional.map(entity -> {
			if (entity != null) {
				userRepository.delete(entity);
				log.info("delete:: deleted entity with id: {}", id);
				return true;
			} else {
				return false;
			}
		}).orElseGet(() -> {
			log.error("delete:: could not delete entity with id: {}", id);
			return false;
		});
	}

	/**
	 * Retrieves a page of users.
	 *
	 * @param offset   the index of the first user to retrieve
	 * @param pageSize the maximum number of users to retrieve
	 * @return a page of users, containing the requested users and metadata about
	 *         the
	 *         page
	 */
	public Page<UserDto> getPage(int offset, int pageSize) {
		Page<UserEntity> page = userRepository.findAll(PageRequest.of(offset, pageSize));
		return page.map(UserMapper::mapToDto);
	}

	@Override
	public void changePassword(ChangePasswordRequest request, Principal connectedUser) {

		var user = (UserEntity) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

		// check if the current password is correct
		if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
			throw new IllegalStateException("Wrong password");
		}
		// check if the two new passwords are the same
		if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
			throw new IllegalStateException("Password are not the same");
		}

		// update the password
		user.setPassword(passwordEncoder.encode(request.getNewPassword()));

		// save the new password
		userRepository.save(user);
	}
}
