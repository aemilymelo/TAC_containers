package br.edu.utfpr.api.service;
import org.springframework.stereotype.Service;
import br.edu.utfpr.api.model.Pessoa;
import br.edu.utfpr.api.repository.PessoaRepository;
import br.edu.utfpr.api.utils.CrudServiceImpl;
import java.util.List;
import java.util.Optional;

@Service
public class PessoaService extends CrudServiceImpl<Pessoa, Long> {

    private final PessoaRepository pessoaRepository;

    public PessoaService(PessoaRepository repository) {
        super(repository);
        this.pessoaRepository = repository;
    }

    public Optional<Pessoa> findByEmail(String value) {
        List<Pessoa> users =  pessoaRepository.findAllByEmail(value);
        if (users.isEmpty()) {
           return Optional.empty();
        }
        return Optional.of(users.get(0));
    }


}
