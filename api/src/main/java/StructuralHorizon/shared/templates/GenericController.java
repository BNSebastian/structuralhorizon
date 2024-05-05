package StructuralHorizon.shared.templates;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

public class GenericController<T extends GenericEntity>{
    @Autowired
    private GenericService<T> genericService;

    @PostMapping("/save")
    public ResponseEntity<T> save(@RequestBody T request) {
        Optional<T> optionalEntity = genericService.save(request);
        return optionalEntity
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
