package StructuralHorizon.shared.templates;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
public class GenericService<T extends GenericEntity> implements IGenericService<T> {

    @Autowired
    protected IGenericRepository<T> genericRepository;

    public Optional<T> save(T request) {
        try {
            T savedEntity = genericRepository.save(request);
            log.info("save:: created entity with id: {}", savedEntity.getId());
            return Optional.of(savedEntity);
        } catch (Exception exception) {
            log.error("save:: could not map request to entity");
            return Optional.empty();
        }
    }

    public Optional<List<T>> getAll() {
        return Optional.empty();
    }

    public Optional<T> getById(UUID id) {
        return Optional.empty();
    }

    public Optional<T> update(T request) {
        return Optional.empty();
    }

    public Boolean delete(UUID id) {
        return null;
    }

    public Page<T> getPage(int pageIndex, int pageSize) {
        return null;
    }
}