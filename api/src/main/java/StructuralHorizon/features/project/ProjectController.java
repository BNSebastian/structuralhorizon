package StructuralHorizon.features.project;

import StructuralHorizon.features.project.models.NewProjectDto;
import StructuralHorizon.features.project.models.ProjectDto;
import StructuralHorizon.features.project.models.UpdateProjectDto;
import StructuralHorizon.shared.Endpoints;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping(Endpoints.project)
@RequiredArgsConstructor
public class ProjectController {

    @Autowired
    private final IProjectService service;

    @PostMapping("/save")
    public ResponseEntity<ProjectDto> save(@RequestBody NewProjectDto request) {
        Optional<ProjectDto> optionalEntity = service.save(request);
        return optionalEntity
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<ProjectDto>> getAll() {
        Optional<List<ProjectDto>> optionalEntities = service.getAll();
        return optionalEntities
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/getById")
    public ResponseEntity<ProjectDto> getById(@RequestParam("id") UUID id) {
        Optional<ProjectDto> optionalEntity = service.getById(id);
        return optionalEntity
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/update")
    public ResponseEntity<ProjectDto> update(@RequestBody UpdateProjectDto request) {
        Optional<ProjectDto> optionalEntity = service.update(request);
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
    public ResponseEntity<Page<ProjectDto>> getPage(
            @RequestParam("pageIndex") int pageIndex,
            @RequestParam("pageSize") int pageSize) {
        Page<ProjectDto> page = service.getPage(pageIndex, pageSize);
        return ResponseEntity.ok(page);
    }
}
