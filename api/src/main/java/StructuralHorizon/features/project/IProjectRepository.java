package StructuralHorizon.features.project;

import StructuralHorizon.features.project.models.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface IProjectRepository extends JpaRepository<Project, UUID> {

}
