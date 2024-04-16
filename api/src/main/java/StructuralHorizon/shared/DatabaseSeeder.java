package StructuralHorizon.shared;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import StructuralHorizon.core.user.UserRepository;
import StructuralHorizon.core.user.model.Role;
import StructuralHorizon.core.user.model.UserEntity;

import java.util.List;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final UserRepository userRepository;

    @Autowired
    public DatabaseSeeder(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        seedUsers();
    }

    @SuppressWarnings("null")
    private void seedUsers() {
        UserEntity admin = new UserEntity();
        admin.setName("Bucovala Sebastian");
        admin.setEmail("seb@cheneb.com");
        admin.setPassword("$2a$10$r9ueA6pt.1oLoJRAoOXTYuG7akG9gpCDkKyNHdab2MbF3U8cOdjy2");
        admin.setRole(Role.ADMIN);

        UserEntity alex = new UserEntity();
        alex.setName("Aporcaritei Alexandru");
        alex.setEmail("alex@gmail.com");
        alex.setPassword("$2a$10$qq8YYZ5ryUm7QXXXh7K9G.Jfw5qeCdi0.RswiANt0AqEdUQZ4stsy");
        alex.setRole(Role.ADMIN);

        UserEntity mior = new UserEntity();
        mior.setName("Bucovala Maria");
        mior.setEmail("mior@mior.com");
        mior.setPassword("$2a$10$r9ueA6pt.1oLoJRAoOXTYuG7akG9gpCDkKyNHdab2MbF3U8cOdjy2");
        mior.setRole(Role.USER);

        userRepository.saveAll(List.of(admin, alex, mior));
    }
}
