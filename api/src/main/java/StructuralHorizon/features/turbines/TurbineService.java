package StructuralHorizon.features.turbines;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import StructuralHorizon.features.turbines.models.Turbine;
import StructuralHorizon.features.turbines.models.TurbineCreateDto;
import StructuralHorizon.features.turbines.models.TurbineDto;
import StructuralHorizon.features.turbines.models.TurbineMapper;
import StructuralHorizon.features.turbines.models.TurbineUpdateDto;

@Slf4j
@Service
public class TurbineService implements ITurbineService {

    @Autowired
    private ITurbineRepository repository;

    /**
     * Saves a new Turbine to the database.
     *
     * @param request the Turbine data to be saved
     * @return the saved Turbine data, or an empty optional if the save failed
     */
    @Override
    public Optional<TurbineDto> save(TurbineCreateDto request) {
        if (request != null) {
            Turbine pendingEntity = TurbineMapper.mapToEntity(request);
            if (pendingEntity != null) {
                Turbine savedEntity = repository.save(pendingEntity);
                log.info("save:: created entity with id: {}", savedEntity.getId());
                return Optional.of(TurbineMapper.mapToDto(savedEntity));
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
    public Optional<List<TurbineDto>> getAll() {
        List<Turbine> users = repository.findAll();
        log.info("getAll:: retrieving all entities");
        return Optional.ofNullable(users
                .stream()
                .map(TurbineMapper::mapToDto)
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
    public Optional<TurbineDto> getById(UUID id) {
        if (id == null) {
            log.error("getById:: id is null");
            return Optional.empty();
        }

        Optional<Turbine> entityOptional = repository.findById(id);

        return entityOptional.map(entity -> {
            log.info("getById:: retrieved entity with id: {}", id);
            return Optional.of(TurbineMapper.mapToDto(entity));
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
    public Optional<TurbineDto> update(TurbineUpdateDto request) {
        if (request == null) {
            log.error("update:: invalid request");
            return Optional.empty();
        }

        UUID id = request.getId();

        if (id == null) {
            log.error("update:: id is null");
            return Optional.empty();
        }

        Optional<Turbine> optionalTurbine = repository.findById(id);

        if (optionalTurbine.isPresent()) {
            Turbine existingEntity = optionalTurbine.get();
            existingEntity.setNumber(request.getNumber());
            existingEntity.setLocation(request.getLocation());
            Turbine updatedEntity = repository.save(existingEntity);

            log.info("update:: entity with id: {} updated", updatedEntity.getId());
            return Optional.of(TurbineMapper.mapToDto(updatedEntity));
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

        Optional<Turbine> entityOptional = repository.findById(id);

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

    public Page<TurbineDto> getPage(int pageIndex, int pageSize) {
        Page<Turbine> page = repository.findAll(PageRequest.of(pageIndex, pageSize));
        log.info("getPage:: returning page with index '{}' and size '{}'", pageIndex, pageSize);
        return page.map(TurbineMapper::mapToDto);
    }

}
