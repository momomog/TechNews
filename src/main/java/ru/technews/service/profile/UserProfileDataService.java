package ru.technews.service.profile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.technews.dao.BaseDao;
import ru.technews.dao.profile.UserProfileDataDao;
import ru.technews.entity.profile.UserProfileDataEntity;
import ru.technews.service.BaseService;

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
