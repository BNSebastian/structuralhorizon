package StructuralHorizon.features.materials.concrete.models;

import java.util.UUID;

import StructuralHorizon.features.values.Value;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Concrete {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;

    private Value characteristicCompressiveStrength;

    private Value characteristicTensileStrength;

    private Value designCompressiveResistance;

    private Value designTensileResistance;

    // @ManyToMany
    // @JoinTable(name = "project_turbine", joinColumns = @JoinColumn(name =
    // "turbine_id"), inverseJoinColumns = @JoinColumn(name = "project_id"))
    // private List<Project> projects;

    // @OneToMany(mappedBy = "turbine")
    // private List<Activity> activities;
}
