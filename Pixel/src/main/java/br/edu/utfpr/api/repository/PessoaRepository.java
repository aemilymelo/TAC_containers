package br.edu.utfpr.api.repository;

import br.edu.utfpr.api.model.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PessoaRepository extends JpaRepository<Pessoa, Long> {

    public Pessoa findByEmail(String email);

    // substituir essa implementacao quando nao poder inserir dois emails iguais
    public List<Pessoa> findAllByEmail(String email);
}
