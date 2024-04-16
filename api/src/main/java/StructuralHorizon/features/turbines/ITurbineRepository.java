package StructuralHorizon.features.turbines;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import StructuralHorizon.features.turbines.models.Turbine;

public interface ITurbineRepository extends JpaRepository<Turbine, UUID> {

}
