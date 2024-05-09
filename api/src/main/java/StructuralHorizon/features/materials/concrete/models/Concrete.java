package StructuralHorizon.features.materials.concrete.models;

import java.util.UUID;

import StructuralHorizon.features.values.Value;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
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

    // /**
    // * @symbol: f_ck
    // */
    // @OneToOne(cascade = CascadeType.ALL)
    // private Value characteristicCompressiveStrength;

    // /**
    // * @symbol: f_ctk
    // */
    // @OneToOne(cascade = CascadeType.ALL)
    // private Value characteristicTensileStrength;

    // /**
    // * @symbol: f_cd
    // */
    // @OneToOne(cascade = CascadeType.ALL)
    // private Value designCompressiveResistance;

    // /**
    // * @symbol: f_ctd
    // */
    // @OneToOne(cascade = CascadeType.ALL)
    // private Value designTensileResistance;

    // @ManyToMany
    // @JoinTable(name = "project_turbine", joinColumns = @JoinColumn(name =
    // "turbine_id"), inverseJoinColumns = @JoinColumn(name = "project_id"))
    // private List<Project> projects;

    // @OneToMany(mappedBy = "turbine")
    // private List<Activity> activities;
}
