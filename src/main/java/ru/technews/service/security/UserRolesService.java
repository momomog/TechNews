package ru.ibs.intern.traineeship.service.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.ibs.intern.traineeship.dao.BaseDao;
import ru.ibs.intern.traineeship.dao.security.UserRolesDao;
import ru.ibs.intern.traineeship.entity.security.UserRolesEntity;
import ru.ibs.intern.traineeship.service.BaseService;

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