package StructuralHorizon.features.materials.concrete.models;

public class ConcreteMapper {
	public static ConcreteDto mapToDto(Concrete entity) {
		return ConcreteDto.builder()
				.name(entity.getName())
				.characteristicCompressiveStrength(entity.getCharacteristicCompressiveStrength())
				.characteristicCompressiveStrength_unit(entity.getCharacteristicCompressiveStrength_unit())
				.characteristicTensileStrength(entity.getCharacteristicTensileStrength())
				.characteristicTensileStrength_unit(entity.getCharacteristicTensileStrength_unit())
				.designCompressiveResistance(entity.getDesignCompressiveResistance())
				.designCompressiveResistance_unit(entity.getDesignCompressiveResistance_unit())
				.designTensileResistance(entity.getDesignTensileResistance())
				.designTensileResistance_unit(entity.getDesignTensileResistance_unit())
				.build();
	}

	public static Concrete mapToEntity(ConcreteDtoCreate request) {
		return Concrete.builder()
				.name(request.getName())
				.build();
	}
}
