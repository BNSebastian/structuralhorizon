package StructuralHorizon.core.user;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;

import StructuralHorizon.core.user.model.ChangePasswordRequest;
import StructuralHorizon.core.user.model.UserCreateDto;
import StructuralHorizon.core.user.model.UserDto;
import StructuralHorizon.core.user.model.UserUpdateDto;

public interface IUserService {
    Optional<UserDto> save(UserCreateDto request);

    Optional<List<UserDto>> getAll();

    Optional<UserDto> getById(UUID id);

    Optional<UserDto> update(UserUpdateDto request);

    Boolean delete(UUID id);

    Page<UserDto> getPage(int offset, int pageSize);

    void changePassword(ChangePasswordRequest request, Principal connectedUser);
}
