package StructuralHorizon.features.project.models;

import StructuralHorizon.features.Value;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;

    // CONCRETE PROPERTIES

    /**
     * @symbol: γ_c
     */
    private Float partialSafetyFactor;

    private List<Float> partialSafetyFactorList = new ArrayList<>(List.of(1.2f, 1.5f));

    /**
     * @symbol: α_cc
     */
    private Float longTermCoefficient;

    private List<Float> longTermCoefficientList = new ArrayList<>(List.of(0.8f, 0.9f, 1f));

    // @ManyToMany
    // @JoinTable(name = "project_turbine", joinColumns = @JoinColumn(name =
    // "turbine_id"), inverseJoinColumns = @JoinColumn(name = "project_id"))
    // private List<Project> projects;

    // @OneToMany(mappedBy = "turbine")
    // private List<Activity> activities;
}
