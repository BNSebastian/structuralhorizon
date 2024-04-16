package StructuralHorizon.features.materials.concrete.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ConcreteCreateDto {
    String number;
    String location;
}
