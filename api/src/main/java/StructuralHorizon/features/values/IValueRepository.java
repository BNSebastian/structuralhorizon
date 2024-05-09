package StructuralHorizon.features.values;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import StructuralHorizon.features.values.models.Value;

public interface IValueRepository extends JpaRepository<Value, UUID> {

}
