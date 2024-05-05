package StructuralHorizon.shared.templates;

import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface IGenericService<T extends GenericEntity> {
    Optional<T> save(T request);

    Optional<List<T>> getAll();

    Optional<T> getById(UUID id);

    Optional<T> update(T request);

    Boolean delete(UUID id);

    Page<T> getPage(int pageIndex, int pageSize);
}
