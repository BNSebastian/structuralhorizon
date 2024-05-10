package StructuralHorizon.features.materials.concrete;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;

import StructuralHorizon.features.materials.concrete.models.ConcreteDtoCreate;
import StructuralHorizon.features.materials.concrete.models.ConcreteDto;
import StructuralHorizon.features.materials.concrete.models.ConcreteDtoUpdate;
import StructuralHorizon.features.values.models.ValueDto;

public interface IConcreteService {
    Optional<ConcreteDto> save(ConcreteDtoCreate request);

    Optional<List<ConcreteDto>> getAll();

    Optional<ConcreteDto> getById(UUID id);

    Optional<ConcreteDto> update(ConcreteDtoUpdate request);

    Boolean delete(UUID id);

    Page<ConcreteDto> getPage(int pageIndex, int pageSize);
}
