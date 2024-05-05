package StructuralHorizon.shared.templates;

import StructuralHorizon.features.materials.concrete.models.Concrete;
import StructuralHorizon.features.materials.concrete.models.ConcreteMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

@Slf4j
public class TemplateService<T, C, R, U>{
    private JpaRepository<T, UUID> repository;

    private TemplateEntity entity;

    public TemplateService(JpaRepository<T, UUID> repository, TemplateEntity entity) {
        this.repository = repository;
        this.entity = entity;
    }

    public Optional<R> save(C request) {
        if (request != null) {
            Concrete pendingEntity = ConcreteMapper.mapToEntity(request);
            if (pendingEntity != null) {
                Concrete savedEntity = repository.save(pendingEntity);
                log.info("save:: created entity with id: {}", savedEntity.getId());
                return Optional.of(ConcreteMapper.mapToDto(savedEntity));
            } else {
                log.error("save:: could not map request to entity");
                return Optional.empty();
            }
        } else {
            log.error("save:: invalid request");
            return Optional.empty();
        }
    }
}