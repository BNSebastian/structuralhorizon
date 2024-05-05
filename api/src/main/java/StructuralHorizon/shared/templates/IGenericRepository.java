package StructuralHorizon.shared.templates;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface IGenericRepository<T extends GenericEntity> extends JpaRepository<T, UUID> {
}
