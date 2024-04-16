package StructuralHorizon.features.turbines;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;

import StructuralHorizon.features.turbines.models.TurbineCreateDto;
import StructuralHorizon.features.turbines.models.TurbineDto;
import StructuralHorizon.features.turbines.models.TurbineUpdateDto;

public interface ITurbineService {
    Optional<TurbineDto> save(TurbineCreateDto request);

    Optional<List<TurbineDto>> getAll();

    Optional<TurbineDto> getById(UUID id);

    Optional<TurbineDto> update(TurbineUpdateDto request);

    Boolean delete(UUID id);

    Page<TurbineDto> getPage(int pageIndex, int pageSize);
}
