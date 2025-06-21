package br.edu.utfpr.api.service;

import org.springframework.stereotype.Service;

import br.edu.utfpr.api.model.TipoDado;
import br.edu.utfpr.api.repository.TipoDadoRepository;
import br.edu.utfpr.api.utils.CrudServiceImpl;

@Service
public class TipoDadoService extends CrudServiceImpl<TipoDado, Long> {

    public TipoDadoService(TipoDadoRepository repository) {
        super(repository);
    }

}
