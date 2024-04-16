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
public class ConcreteUpdateDto {
    private UUID id;
    private String number;
    private String location;
}
