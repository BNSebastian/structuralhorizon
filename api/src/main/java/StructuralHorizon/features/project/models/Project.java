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
@Table(name = "turbines")
public class Project {
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
