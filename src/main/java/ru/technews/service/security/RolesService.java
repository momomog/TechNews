package ru.ibs.intern.traineeship.service.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.ibs.intern.traineeship.dao.BaseDao;
import ru.ibs.intern.traineeship.dao.security.RolesDao;
import ru.ibs.intern.traineeship.entity.security.RolesEntity;
import ru.ibs.intern.traineeship.service.BaseService;

@Service
@Transactional
public class RolesService extends BaseService<RolesEntity> {

    @Autowired
    private RolesDao dao;

    @Override
    public BaseDao<RolesEntity> getBaseDao() {
        return dao;
    }
}