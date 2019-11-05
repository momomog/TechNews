package ru.technews.service;

import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;
import ru.technews.dao.BaseDao;
import ru.technews.dao.security.UsersDao;
import ru.technews.entity.security.UsersEntity;

import java.util.List;

@Service
public class UsersService extends BaseService<UsersEntity>{

    private UsersDao dao;

    public UsersService(UsersDao dao) {
        this.dao = dao;
    }

    public Boolean isEmailExists(final String mail) {
        return dao.findByUsername(mail) != null;
    }

    @Override
    public BaseDao getBaseDao() {
        return dao;
    }

    @Override
    public List<UsersEntity> findAll() {
        List<UsersEntity> all = super.findAll();
        all.forEach(usersEntity -> Hibernate.initialize(usersEntity.getUserProfileData()));
        return all;
    }
}