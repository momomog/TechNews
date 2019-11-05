package ru.ibs.intern.traineeship.service.profile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.ibs.intern.traineeship.dao.BaseDao;
import ru.ibs.intern.traineeship.dao.profile.UserProfilePhotoDao;
import ru.ibs.intern.traineeship.entity.profile.UserProfilePhotoEntity;
import ru.ibs.intern.traineeship.service.BaseService;

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
