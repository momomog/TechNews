package ru.technews.dao.security;

import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;
import ru.technews.dao.BaseDao;
import ru.technews.entity.security.UsersEntity;


@Repository
public class UsersDao extends BaseDao<UsersEntity> {

    private final SessionFactory sessionFactory;

    public UsersDao(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    public UsersEntity findByUsername(String email) {
        Query<UsersEntity> query = sessionFactory.getCurrentSession().createQuery("FROM UsersEntity u where u.email=:email", UsersEntity.class);
        query.setParameter("email", email);
        return query.uniqueResult();
    }

}
