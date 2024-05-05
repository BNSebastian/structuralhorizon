package StructuralHorizon.features.materials.steel;

import StructuralHorizon.shared.templates.GenericEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table
public class Steel extends GenericEntity {

}
