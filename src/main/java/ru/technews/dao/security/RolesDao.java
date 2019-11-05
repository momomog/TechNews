package ru.ibs.intern.traineeship.dao.security;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.ibs.intern.traineeship.dao.BaseDao;
import ru.ibs.intern.traineeship.entity.security.RolesEntity;

@Repository
@Transactional
public class RolesDao extends BaseDao<RolesEntity> {
}
