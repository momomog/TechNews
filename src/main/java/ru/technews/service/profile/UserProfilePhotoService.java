package ru.technews.service.profile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.technews.dao.BaseDao;
import ru.technews.dao.profile.UserProfilePhotoDao;
import ru.technews.entity.profile.UserProfilePhotoEntity;
import ru.technews.service.BaseService;


@Service
@Transactional
public class UserProfilePhotoService extends BaseService<UserProfilePhotoEntity> {

    @Autowired
    private UserProfilePhotoDao dao;

    @Override
    public BaseDao<UserProfilePhotoEntity> getBaseDao() {
        return dao;
    }
}
