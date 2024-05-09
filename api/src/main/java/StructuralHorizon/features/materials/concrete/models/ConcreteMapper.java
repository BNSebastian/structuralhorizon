package StructuralHorizon.features.materials.concrete.models;

public class ConcreteMapper {
	public static ConcreteDto mapToDto(Concrete entity) {
		return ConcreteDto.builder()
				.id(entity.getId())
				.name(entity.getName())
				.characteristicCompressiveStrength(entity.getCharacteristicCompressiveStrength())
				.characteristicTensileStrength(entity.getCharacteristicTensileStrength())
				.designCompressiveResistance(entity.getDesignCompressiveResistance())
				.designTensileResistance(entity.getDesignTensileResistance())
				.build();
	}

	public static Concrete mapToEntity(ConcreteCreationRequest request) {
		return Concrete.builder()
				.name(request.getName())
				.build();
	}
}
