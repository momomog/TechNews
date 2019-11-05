package ru.technews.dao.profile;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.technews.dao.BaseDao;
import ru.technews.entity.profile.UserProfileDataEntity;


@Repository
@Transactional
public class UserProfileDataDao extends BaseDao<UserProfileDataEntity> {

}
