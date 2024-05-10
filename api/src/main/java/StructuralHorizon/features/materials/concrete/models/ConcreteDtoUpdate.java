package StructuralHorizon.features.materials.concrete.models;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ConcreteDtoUpdate {
    private UUID id;

    private String name;

    private Double characteristicCompressiveStrength;
    private String characteristicCompressiveStrength_unit;

    private Double characteristicTensileStrength;
    private String characteristicTensileStrength_unit;

    private Double designCompressiveResistance;
    private String designCompressiveResistance_unit;

    private Double designTensileResistance;
    private String designTensileResistance_unit;
}
