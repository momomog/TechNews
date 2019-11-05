package ru.technews.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.GenericTypeResolver;
import ru.technews.entity.BaseEntity;

import java.util.List;

public abstract class BaseDao<E extends BaseEntity> implements CRUDDao<E, Long> {

    private SessionFactory sessionFactory;

    private Class<E> entityClass;

    public BaseDao() {
        Class<?>[] resolveTypeArguments = GenericTypeResolver.resolveTypeArguments(this.getClass(), BaseDao.class);
        this.entityClass = (Class<E>) resolveTypeArguments[0];
    }

    @Autowired
    @Qualifier("sessionFactory")
    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public void save(E entity) {
        getCurrentSession().save(entity);
    }

    @Override
    public List findAll() {
        return getCurrentSession().createQuery("from " + getTargetClass().getName()).list();
    }

    @Override
    public E findById(Long id) {
        E object = (E) getCurrentSession().get(getTargetClass().getName(), id);
        return object;
    }

    @Override
    public void deleteById(Long id) {
        Object entity = this.findById(id);
        getCurrentSession().delete(entity);
    }

    @Override
    public void deleteAll() {
        List<BaseEntity> list = this.findAll();
        for (BaseEntity entity : list) {
            getCurrentSession().delete(entity);
        }
    }

    @Override
    public void update(E entity) {
        getCurrentSession().update(entity);
    }

    private Session getCurrentSession() {
        return sessionFactory.getCurrentSession();
    }

    private Class<E> getTargetClass() {
        return this.entityClass;
    }
}