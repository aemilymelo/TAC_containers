package br.edu.utfpr.api.service;

import br.edu.utfpr.api.model.Propriedade;
import br.edu.utfpr.api.repository.PropriedadeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import br.edu.utfpr.api.utils.CrudServiceImpl;
import org.springframework.http.ResponseEntity;

@Service
public class PropriedadeService extends CrudServiceImpl<Propriedade, Long> {

    private final PropriedadeRepository propriedadeRepository;

    @Autowired
    public PropriedadeService(PropriedadeRepository propriedadeRepository) {
        super(propriedadeRepository);
        this.propriedadeRepository = propriedadeRepository;
    }

    // Método para buscar a propriedade, retornando ResponseEntity
    @Override
    public ResponseEntity<Propriedade> findById(Long id) {
        Optional<Propriedade> propriedade = propriedadeRepository.findById(id);
        if (propriedade.isPresent()) {
            return ResponseEntity.ok(propriedade.get()); // Retorna a propriedade com status 200 OK
        } else {
            return ResponseEntity.notFound().build(); // Retorna 404 se a propriedade não for encontrada
        }
    }
}