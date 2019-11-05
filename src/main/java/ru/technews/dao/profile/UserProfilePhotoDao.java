package ru.ibs.intern.traineeship.dao.profile;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.ibs.intern.traineeship.dao.BaseDao;
import ru.ibs.intern.traineeship.entity.profile.UserProfilePhotoEntity;

@Repository
@Transactional
public class UserProfilePhotoDao extends BaseDao<UserProfilePhotoEntity> {

}
