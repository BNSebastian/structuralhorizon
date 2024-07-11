package StructuralHorizon.features.materials.concrete.models;

public class ConcreteMapper {
	public static ConcreteDto mapToDto(Concrete entity) {
		return ConcreteDto.builder()
				.name(entity.getName())
				.characteristicCompressiveStrength(entity.getCharacteristicCompressiveStrength())
				.characteristicTensileStrength(entity.getCharacteristicTensileStrength())
				.designCompressiveResistance(entity.getDesignCompressiveResistance())
				.designTensileResistance(entity.getDesignTensileResistance())
				.build();
	}

	public static Concrete mapToEntity(ConcreteDtoCreate request) {
		return Concrete.builder()
				.name(request.getName())
				.build();
	}
}
