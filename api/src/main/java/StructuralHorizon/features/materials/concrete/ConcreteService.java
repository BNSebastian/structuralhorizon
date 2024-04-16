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
import StructuralHorizon.features.materials.concrete.models.ConcreteCreateDto;
import StructuralHorizon.features.materials.concrete.models.ConcreteDto;
import StructuralHorizon.features.materials.concrete.models.ConcreteMapper;
import StructuralHorizon.features.materials.concrete.models.ConcreteUpdateDto;

@Slf4j
@Service
public class ConcreteService implements IConcreteService {

    @Autowired
    private IConcreteRepository repository;

    /**
     * Saves a new Turbine to the database.
     *
     * @param request the Turbine data to be saved
     * @return the saved Turbine data, or an empty optional if the save failed
     */
    @Override
    public Optional<ConcreteDto> save(ConcreteCreateDto request) {
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

    /**
     * Retrieves all Turbines.
     *
     * @return an optional containing the list of Turbines, or an empty optional if
     *         no Turbines were found
     */
    @Override
    public Optional<List<ConcreteDto>> getAll() {
        List<Concrete> users = repository.findAll();
        log.info("getAll:: retrieving all entities");
        return Optional.ofNullable(users
                .stream()
                .map(ConcreteMapper::mapToDto)
                .collect(Collectors.toList()));
    }

    /**
     * Retrieves a Turbine by its ID.
     *
     * @param id the ID of the Turbine to retrieve
     * @return an optional containing the Turbine data, or an empty optional if no
     *         Turbine was found with the given ID
     */
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

    /**
     * Updates an existing Turbine in the database.
     *
     * @param request the updated Turbine data
     * @return the updated Turbine data, or an empty optional if the update failed
     */
    @Override
    public Optional<ConcreteDto> update(ConcreteUpdateDto request) {
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
            existingEntity.setNumber(request.getNumber());
            existingEntity.setLocation(request.getLocation());
            Concrete updatedEntity = repository.save(existingEntity);

            log.info("update:: entity with id: {} updated", updatedEntity.getId());
            return Optional.of(ConcreteMapper.mapToDto(updatedEntity));
        } else {
            log.error("update:: entity with id {} not found", id);
            return Optional.empty();
        }
    }

    /**
     * Deletes a Turbine by its ID.
     *
     * @param id the ID of the Turbine to delete
     * @return true if the Turbine was successfully deleted, or false if no Turbine
     *         was found with the given ID
     */
    @Override
    public Boolean delete(UUID id) {
        if (id == null) {
            log.error("delete:: id is null");
            return false;
        }

        Optional<Concrete> entityOptional = repository.findById(id);

        return entityOptional.map(entity -> {
            if (entity != null) {
                repository.delete(entity);
                log.info("delete:: deleted entity with id: {}", id);
                return true;
            } else {
                return false;
            }
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

}
