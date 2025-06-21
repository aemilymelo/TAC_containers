package br.edu.utfpr.api.utils;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;


public interface Crud<T, ID>  {

    List<T> findAll(Pageable pageable);
    ResponseEntity<T> findById(ID id);
    ResponseEntity<T> save(T entity);
    ResponseEntity<Void> deleteById(ID id);
    ResponseEntity<T> update(ID id, T entity);
}

