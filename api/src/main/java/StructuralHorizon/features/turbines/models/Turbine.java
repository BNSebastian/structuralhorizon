package StructuralHorizon.features.turbines.models;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "turbines")
public class Turbine {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String number;

    private String location;

    // @ManyToMany
    // @JoinTable(name = "project_turbine", joinColumns = @JoinColumn(name =
    // "turbine_id"), inverseJoinColumns = @JoinColumn(name = "project_id"))
    // private List<Project> projects;

    // @OneToMany(mappedBy = "turbine")
    // private List<Activity> activities;
}
