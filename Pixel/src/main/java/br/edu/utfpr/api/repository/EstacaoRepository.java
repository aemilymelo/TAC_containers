package br.edu.utfpr.api.repository;

import br.edu.utfpr.api.model.Estacao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EstacaoRepository extends JpaRepository<Estacao, Long> {
}
