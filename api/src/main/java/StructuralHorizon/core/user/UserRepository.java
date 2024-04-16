package StructuralHorizon.core.user;

import org.springframework.data.jpa.repository.JpaRepository;

import StructuralHorizon.core.user.model.UserEntity;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<UserEntity, UUID> {
    Optional<UserEntity> findByEmail(String email);

    Optional<UserEntity> findByName(String name);
}
