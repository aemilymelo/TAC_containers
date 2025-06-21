package br.edu.utfpr.api.service;
import org.springframework.stereotype.Service;

import br.edu.utfpr.api.model.Estacao;
import br.edu.utfpr.api.repository.EstacaoRepository;
import br.edu.utfpr.api.utils.CrudServiceImpl;

@Service
public class EstacaoService extends CrudServiceImpl<Estacao, Long> {
    
    public EstacaoService(EstacaoRepository repository) {
        super(repository);
    }

}
