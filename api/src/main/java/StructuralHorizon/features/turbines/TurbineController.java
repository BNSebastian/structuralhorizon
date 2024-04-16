package StructuralHorizon.features.turbines;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import StructuralHorizon.features.turbines.models.TurbineCreateDto;
import StructuralHorizon.features.turbines.models.TurbineDto;
import StructuralHorizon.features.turbines.models.TurbineUpdateDto;

@RestController
@RequestMapping("api/turbine")
@RequiredArgsConstructor
public class TurbineController {

    @Autowired
    private final ITurbineService service;

    @PostMapping("/save")
    public ResponseEntity<TurbineDto> save(@RequestBody TurbineCreateDto request) {
        Optional<TurbineDto> optionalEntity = service.save(request);
        return optionalEntity
                .map(entity -> ResponseEntity.ok(entity))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<TurbineDto>> getAll() {
        Optional<List<TurbineDto>> optionalEntities = service.getAll();
        return optionalEntities
                .map(entities -> ResponseEntity.ok(entities))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/getById")
    public ResponseEntity<TurbineDto> getById(@RequestParam("id") UUID id) {
        Optional<TurbineDto> optionalEntity = service.getById(id);
        return optionalEntity
                .map(entity -> ResponseEntity.ok(entity))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/update")
    public ResponseEntity<TurbineDto> update(@RequestBody TurbineUpdateDto request) {
        Optional<TurbineDto> optionalEntity = service.update(request);
        return optionalEntity
                .map(entity -> ResponseEntity.ok(entity))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Boolean> delete(@RequestParam("id") UUID id) {
        if (id == null) {
            return ResponseEntity.badRequest().body(false);
        }

        Boolean deleted = service.delete(id);

        if (deleted) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getPage")
    public ResponseEntity<Page<TurbineDto>> getPage(
            @RequestParam("pageIndex") int pageIndex,
            @RequestParam("pageSize") int pageSize) {
        Page<TurbineDto> page = service.getPage(pageIndex, pageSize);
        return ResponseEntity.ok(page);
    }
}
