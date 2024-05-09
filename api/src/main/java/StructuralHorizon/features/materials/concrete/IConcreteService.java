package StructuralHorizon.features.materials.concrete;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;

import StructuralHorizon.features.materials.concrete.models.ConcreteCreationRequest;
import StructuralHorizon.features.materials.concrete.models.ConcreteDto;
import StructuralHorizon.features.materials.concrete.models.ConcreteUpdateRequest;

public interface IConcreteService {
    Optional<ConcreteDto> save(ConcreteCreationRequest request);

    Optional<List<ConcreteDto>> getAll();

    Optional<ConcreteDto> getById(UUID id);

    Optional<ConcreteDto> update(ConcreteUpdateRequest request);

    Boolean delete(UUID id);

    Page<ConcreteDto> getPage(int pageIndex, int pageSize);
}
