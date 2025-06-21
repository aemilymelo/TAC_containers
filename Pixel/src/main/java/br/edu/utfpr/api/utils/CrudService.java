package br.edu.utfpr.api.utils;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

public interface CrudService<T, ID> {
    
    ResponseEntity<T> save(T entity);
    ResponseEntity<T> findById(ID id);
    List<T> findAll(Pageable pageable);
    ResponseEntity<Void> deleteById(ID id);
    ResponseEntity<T> update(ID id, T entity);
}