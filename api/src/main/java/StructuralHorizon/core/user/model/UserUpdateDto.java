package StructuralHorizon.core.user.model;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserUpdateDto {
    private UUID id;
    private String email;
    private String name;
    private String currentPassword;
    private String newPassword;
    private String confirmationPassword;
}
