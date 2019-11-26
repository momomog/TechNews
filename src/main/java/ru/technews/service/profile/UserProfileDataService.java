package ru.technews.service.profile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.technews.dao.BaseDao;
import ru.technews.dao.post.profile.UserProfileDataDao;
import ru.technews.entity.profile.UserProfileData;
import ru.technews.service.BaseService;

@Service
public class UserProfileDataService extends BaseService<UserProfileData> {

    @Autowired
    UserProfileDataDao userProfileDataDao;

    @Override
    public BaseDao<UserProfileData> getBaseDao() {
        return userProfileDataDao;
    }

}
