package StructuralHorizon.features.materials.concrete;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import StructuralHorizon.features.materials.concrete.models.Concrete;

public interface IConcreteRepository extends JpaRepository<Concrete, UUID> {

}
