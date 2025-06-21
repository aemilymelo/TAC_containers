package br.edu.utfpr.api.service;

import org.springframework.stereotype.Service;
import br.edu.utfpr.api.model.DadoClimatico;
import br.edu.utfpr.api.repository.DadoClimaticoRepository;
import br.edu.utfpr.api.utils.CrudServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class DadoClimaticoService extends CrudServiceImpl<DadoClimatico, Long> {

  private final DadoClimaticoRepository repository;

  @Autowired
  public DadoClimaticoService(DadoClimaticoRepository repository) {
    super(repository);
    this.repository = repository;
  }

  // Consultar dados climáticos por Estação
  public List<DadoClimatico> findByEstacaoId(Long id) {
    return repository.findByEstacaoId(id);
  }

  // Consultar dados climáticos por Tipo (Ignorando Maiúsculas e Minúsculas)
  public List<DadoClimatico> findByTipoIgnoreCase(String tipo) {
    return repository.findByTipoIgnoreCase(tipo);
  }

  // Consultar dados climáticos por Data e Hora (Entre dois períodos)
  public List<DadoClimatico> findByDataHoraBetween(LocalDateTime inicio, LocalDateTime fim) {
    return repository.findByDataHoraBetween(inicio, fim);
  }
}