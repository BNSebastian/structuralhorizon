package StructuralHorizon.features.materials.concrete.models;

import java.util.UUID;

import StructuralHorizon.features.values.models.Value;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ConcreteUpdateRequest {
    private UUID id;
    private String name;
    private Value characteristicCompressiveStrength;
    private Value characteristicTensileStrength;
    private Value designCompressiveResistance;
    private Value designTensileResistance;
}
