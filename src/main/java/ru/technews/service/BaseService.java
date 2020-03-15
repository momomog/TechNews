package ru.technews.service;

import org.springframework.transaction.annotation.Transactional;
import ru.technews.dao.BaseDao;
import ru.technews.entity.BaseEntity;

import java.util.List;

@Transactional
public abstract class BaseService<E extends BaseEntity> {

    public void save(E entity) {
        this.getBaseDao().save(entity);
    }

    public E findById(Long id) {
        return this.getBaseDao().findById(id);
    }

    public List<E> findAll() {
        return this.getBaseDao().findAll();
    }

    public void deleteById(Long id) {
        this.getBaseDao().deleteById(id);
    }

    public void deleteAll() {
        this.getBaseDao().deleteAll();
    }

    public void update(E entity) {
        this.getBaseDao().update(entity);
    }

    public abstract BaseDao<E> getBaseDao();
}
