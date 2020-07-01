package ru.technews.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.technews.dao.BaseDao;
import ru.technews.dao.UserProfileDataDao;
import ru.technews.entity.UserProfileData;

@Service
public class UserProfileDataService extends BaseService<UserProfileData> {

    @Autowired
    UserProfileDataDao userProfileDataDao;

    @Override
    public BaseDao<UserProfileData> getBaseDao() {
        return userProfileDataDao;
    }

}
