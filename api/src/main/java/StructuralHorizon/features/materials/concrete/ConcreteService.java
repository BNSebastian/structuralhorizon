package StructuralHorizon.features.materials.concrete;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import StructuralHorizon.features.materials.concrete.models.Concrete;
import StructuralHorizon.features.materials.concrete.models.ConcreteDtoCreate;
import StructuralHorizon.features.materials.concrete.models.ConcreteDto;
import StructuralHorizon.features.materials.concrete.models.ConcreteMapper;
import StructuralHorizon.features.materials.concrete.models.ConcreteDtoUpdate;
import StructuralHorizon.features.values.IValueRepository;
import StructuralHorizon.features.values.Value;

@Slf4j
@Service
public class ConcreteService implements IConcreteService {

    @Autowired
    private IConcreteRepository repository;

    @Autowired
    private IValueRepository valueRepository;

    @Override
    public Optional<ConcreteDto> save(ConcreteDtoCreate request) {
        if (request != null) {
            Concrete pendingEntity = ConcreteMapper.mapToEntity(request);
            if (pendingEntity != null) {
                Concrete savedEntity = repository.save(pendingEntity);
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

    @Override
    public Optional<List<ConcreteDto>> getAll() {
        List<Concrete> users = repository.findAll();
        log.info("getAll:: retrieving all entities");
        return Optional.of(users
                .stream()
                .map(ConcreteMapper::mapToDto)
                .collect(Collectors.toList()));
    }

    @Override
    public Optional<ConcreteDto> getById(UUID id) {
        if (id == null) {
            log.error("getById:: id is null");
            return Optional.empty();
        }

        Optional<Concrete> entityOptional = repository.findById(id);

        return entityOptional.map(entity -> {
            log.info("getById:: retrieved entity with id: {}", id);
            return Optional.of(ConcreteMapper.mapToDto(entity));
        }).orElseGet(() -> {
            log.error("getById:: could not retrieve entity with id: {}", id);
            return Optional.empty();
        });
    }

    @Override
    public Optional<ConcreteDto> update(ConcreteDtoUpdate request) {
        if (request == null) {
            log.error("update:: invalid request");
            return Optional.empty();
        }

        UUID id = request.getId();

        if (id == null) {
            log.error("update:: id is null");
            return Optional.empty();
        }

        Optional<Concrete> optionalTurbine = repository.findById(id);

        if (optionalTurbine.isPresent()) {
            Concrete existingEntity = optionalTurbine.get();
            // TODO: add entity specific parameters
            Concrete updatedEntity = repository.save(existingEntity);
            log.info("update:: entity with id: {} updated", updatedEntity.getId());
            return Optional.of(ConcreteMapper.mapToDto(updatedEntity));
        } else {
            log.error("update:: entity with id {} not found", id);
            return Optional.empty();
        }
    }

    @Override
    public Boolean delete(UUID id) {
        if (id == null) {
            log.error("delete:: id is null");
            return false;
        }

        Optional<Concrete> entityOptional = repository.findById(id);

        return entityOptional.map(entity -> {
            repository.delete(entity);
            log.info("delete:: deleted entity with id: {}", id);
            return true;
        }).orElseGet(() -> {
            log.error("delete:: could not delete entity with id: {}", id);
            return false;
        });
    }

    public Page<ConcreteDto> getPage(int pageIndex, int pageSize) {
        Page<Concrete> page = repository.findAll(PageRequest.of(pageIndex, pageSize));
        log.info("getPage:: returning page with index '{}' and size '{}'", pageIndex, pageSize);
        return page.map(ConcreteMapper::mapToDto);
    }

    @Override
    public Optional<ConcreteDto> setCharacteristicCompressiveStrength(UUID id, Value value) {
        if (id == null) {
            log.error("setCharacteristicCompressiveStrength:: id is null");
            return Optional.empty();
        }

        Optional<Concrete> entityOptional = repository.findById(id);

        return entityOptional.map(entity -> {
            if (entity.getCharacteristicCompressiveStrength() == null) {
                entity.setCharacteristicCompressiveStrength(valueRepository.save(value));
            } else {
                entity.setCharacteristicCompressiveStrength(value);
            }
            return Optional.of(ConcreteMapper.mapToDto(entity));
        }).orElseGet(() -> {
            log.error("setCharacteristicCompressiveStrength:: could not retrieve entity with id: {}", id);
            return Optional.empty();
        });
    }

}
