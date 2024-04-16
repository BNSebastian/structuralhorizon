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

    // CONCRETE PROPERTIES

    /**
     * @symbol: γ_c
     */
    private Value partialSafetyFactor;

    /**
     * @symbol: α_cc
     */
    private float longTermCoefficient;

    /**
     * @symbol: f_cd
     */
    private Value designCompressiveResistance;

    /**
     * @symbol: f_ctd
     */
    private Value designTensileResistance;



    // @ManyToMany
    // @JoinTable(name = "project_turbine", joinColumns = @JoinColumn(name =
    // "turbine_id"), inverseJoinColumns = @JoinColumn(name = "project_id"))
    // private List<Project> projects;

    // @OneToMany(mappedBy = "turbine")
    // private List<Activity> activities;
}
