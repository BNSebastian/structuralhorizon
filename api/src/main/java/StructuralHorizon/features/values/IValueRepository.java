package StructuralHorizon.features.values;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IValueRepository extends JpaRepository<Value, UUID> {

}
