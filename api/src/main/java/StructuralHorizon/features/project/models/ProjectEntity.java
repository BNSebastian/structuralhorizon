package StructuralHorizon.features.project.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class ProjectEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;

    // CONCRETE PROPERTIES

    /**
     * @symbol: γ_c
     */
    private Float partialSafetyFactor;

    /**
     * @symbol: α_cc
     */
    private Float longTermCoefficient;

    // @ManyToMany
    // @JoinTable(name = "project_turbine", joinColumns = @JoinColumn(name =
    // "turbine_id"), inverseJoinColumns = @JoinColumn(name = "project_id"))
    // private List<Project> projects;

    // @OneToMany(mappedBy = "turbine")
    // private List<Activity> activities;
}
