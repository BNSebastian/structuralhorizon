package StructuralHorizon.features.materials.concrete.models;

import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ConcreteDto {
    private UUID id;
    private String number;
    private String location;
    private List<UUID> projects;
}
