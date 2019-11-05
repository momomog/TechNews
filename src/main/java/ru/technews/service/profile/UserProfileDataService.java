package ru.ibs.intern.traineeship.service.profile;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.ibs.intern.traineeship.dao.BaseDao;
import ru.ibs.intern.traineeship.dao.profile.UserProfileDataDao;
import ru.ibs.intern.traineeship.entity.profile.UserProfileDataEntity;
import ru.ibs.intern.traineeship.entity.security.UsersEntity;
import ru.ibs.intern.traineeship.service.BaseService;

import java.util.List;

@Service
@Transactional
public class UserProfileDataService extends BaseService<UserProfileDataEntity> {

    @Autowired
    private UserProfileDataDao dao;

    @Override
    public BaseDao<UserProfileDataEntity> getBaseDao() {
        return dao;
    }

}
