package ru.ibs.intern.traineeship.dao.security;

import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;
import ru.ibs.intern.traineeship.dao.BaseDao;
import ru.ibs.intern.traineeship.entity.security.UsersEntity;

import java.util.List;

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
