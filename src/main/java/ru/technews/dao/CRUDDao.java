package ru.technews.dao;

import org.springframework.data.repository.Repository;
import java.io.Serializable;
import java.util.List;

public interface CRUDDao<E, Id extends Serializable> extends Repository {

    void save(E entity);

    E findById(Id id);

    List<E> findAll();

    void deleteById(Id id);

    void deleteAll();

    void update(E entity);
}
