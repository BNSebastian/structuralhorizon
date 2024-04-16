package StructuralHorizon.core.user;

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
import StructuralHorizon.core.user.model.UserCreateDto;
import StructuralHorizon.core.user.model.UserDto;
import StructuralHorizon.core.user.model.UserUpdateDto;

@RestController
@RequestMapping("api/user")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private final IUserService service;

    @PostMapping("/save")
    public ResponseEntity<UserDto> save(@RequestBody UserCreateDto request) {
        Optional<UserDto> optionalEntity = service.save(request);
        return optionalEntity
                .map(entity -> ResponseEntity.ok(entity))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<UserDto>> getAll() {
        Optional<List<UserDto>> entitiesOptional = service.getAll();
        return entitiesOptional
                .map(entities -> ResponseEntity.ok(entities))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/getById")
    public ResponseEntity<UserDto> getById(@RequestParam("id") UUID id) {
        Optional<UserDto> entityOptional = service.getById(id);
        return entityOptional
                .map(entity -> ResponseEntity.ok(entity))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/update")
    public ResponseEntity<UserDto> update(@RequestBody UserUpdateDto request) {
        Optional<UserDto> entityOptional = service.update(request);
        return entityOptional
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
    public ResponseEntity<Page<UserDto>> getPage(
            @RequestParam("offset") int offset,
            @RequestParam("pageSize") int pageSize) {
        Page<UserDto> page = service.getPage(offset, pageSize);
        return ResponseEntity.ok(page);
    }
}
