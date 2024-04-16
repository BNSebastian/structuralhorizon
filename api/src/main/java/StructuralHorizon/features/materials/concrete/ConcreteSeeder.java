package StructuralHorizon.features.materials.concrete;

import StructuralHorizon.features.Unit;
import StructuralHorizon.features.Value;
import StructuralHorizon.features.materials.concrete.models.Concrete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ConcreteSeeder implements CommandLineRunner {

    @Autowired
    private IConcreteRepository repository;

    @Override
    public void run(String... args) throws Exception {
        seed();
    }

    @SuppressWarnings("null")
    private void seed() {
        Concrete c20per25 = new Concrete();
        c20per25.setName("C20/25");
        c20per25.setCharacteristicCompressiveStrength(new Value(20f, Unit.NewtonPerSquareMillimetre));
        c20per25.setCharacteristicTensileStrength(new Value(1.5f, Unit.NewtonPerSquareMillimetre));

        repository.saveAll(List.of(c20per25));
    }
}
