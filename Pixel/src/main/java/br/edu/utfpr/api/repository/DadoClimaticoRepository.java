package br.edu.utfpr.api.repository;

import java.time.LocalDateTime;
import java.util.List;
import br.edu.utfpr.api.model.DadoClimatico;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DadoClimaticoRepository extends JpaRepository<DadoClimatico, Long> {

    List<DadoClimatico> findByEstacaoId(Long id);

    List<DadoClimatico> findByTipoIgnoreCase(String tipo);

    List<DadoClimatico> findByDataHoraBetween(LocalDateTime inicio, LocalDateTime fim);
}
