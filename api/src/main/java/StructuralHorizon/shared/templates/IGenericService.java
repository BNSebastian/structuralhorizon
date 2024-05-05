package StructuralHorizon.shared.templates;

import StructuralHorizon.features.materials.concrete.models.ConcreteCreateDto;
import StructuralHorizon.features.materials.concrete.models.ConcreteDto;
import StructuralHorizon.features.materials.concrete.models.ConcreteUpdateDto;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface IGenericService<T extends GenericEntity> {
    Optional<ConcreteDto> save(ConcreteCreateDto request);

    Optional<List<ConcreteDto>> getAll();

    Optional<ConcreteDto> getById(UUID id);

    Optional<ConcreteDto> update(ConcreteUpdateDto request);

    Boolean delete(UUID id);

    Page<ConcreteDto> getPage(int pageIndex, int pageSize);
}
