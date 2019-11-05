package ru.technews.service.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.technews.dao.BaseDao;
import ru.technews.dao.security.UserRolesDao;
import ru.technews.entity.security.UserRolesEntity;
import ru.technews.service.BaseService;


@Service
@Transactional
public class UserRolesService extends BaseService<UserRolesEntity> {

    @Autowired
    private UserRolesDao dao;

    @Override
    public BaseDao<UserRolesEntity> getBaseDao() {
        return dao;
    }
}