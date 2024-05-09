package StructuralHorizon.features.materials.concrete;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import StructuralHorizon.shared.Endpoints;
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
import StructuralHorizon.features.materials.concrete.models.ConcreteCreationRequest;
import StructuralHorizon.features.materials.concrete.models.ConcreteDto;
import StructuralHorizon.features.materials.concrete.models.ConcreteUpdateRequest;

@RestController
@RequestMapping(Endpoints.concrete)
@RequiredArgsConstructor
public class ConcreteController {

    @Autowired
    private final IConcreteService service;

    @PostMapping("/save")
    public ResponseEntity<ConcreteDto> save(@RequestBody ConcreteCreationRequest request) {
        Optional<ConcreteDto> optionalEntity = service.save(request);
        return optionalEntity
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<ConcreteDto>> getAll() {
        Optional<List<ConcreteDto>> optionalEntities = service.getAll();
        return optionalEntities
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/getById")
    public ResponseEntity<ConcreteDto> getById(@RequestParam("id") UUID id) {
        Optional<ConcreteDto> optionalEntity = service.getById(id);
        return optionalEntity
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/update")
    public ResponseEntity<ConcreteDto> update(@RequestBody ConcreteUpdateRequest request) {
        Optional<ConcreteDto> optionalEntity = service.update(request);
        return optionalEntity
                .map(ResponseEntity::ok)
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
    public ResponseEntity<Page<ConcreteDto>> getPage(
            @RequestParam("pageIndex") int pageIndex,
            @RequestParam("pageSize") int pageSize) {
        Page<ConcreteDto> page = service.getPage(pageIndex, pageSize);
        return ResponseEntity.ok(page);
    }
}
