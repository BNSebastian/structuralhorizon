package StructuralHorizon.core.auth;

import java.security.Principal;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import StructuralHorizon.core.auth.models.AuthenticationRequest;
import StructuralHorizon.core.auth.models.AuthenticationResponse;
import StructuralHorizon.core.auth.models.RegisterRequest;
import StructuralHorizon.core.user.UserService;
import StructuralHorizon.core.user.model.ChangePasswordRequest;
import StructuralHorizon.core.user.model.Role;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    @Autowired
    private AuthenticationService authService;

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authService.authenticate(request));
    }

    @GetMapping("/isEmailAvailable")
    public ResponseEntity<Boolean> isEmailAvailable(@RequestParam("email") String request) {
        if (request == null) {
            return ResponseEntity.badRequest().body(false);
        }
        return ResponseEntity.ok(authService.isEmailAvailable(request));
    }

    @GetMapping("/isNameAvailable")
    public ResponseEntity<Boolean> isNameAvailable(@RequestParam("name") String request) {
        if (request == null) {
            return ResponseEntity.badRequest().body(false);
        }
        return ResponseEntity.ok(authService.isNameAvailable(request));
    }

    @PatchMapping("/updatePassword")
    public ResponseEntity<?> changePassword(
            @RequestBody ChangePasswordRequest request,
            Principal connectedUser) {
        userService.changePassword(request, connectedUser);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/getRole")
    public ResponseEntity<Role> getRole(@RequestParam("id") UUID id) {
        Optional<Role> optionalEntity = authService.getRole(id);
        return optionalEntity
                .map(entity -> ResponseEntity.ok(entity))
                .orElse(ResponseEntity.notFound().build());
    }
}
