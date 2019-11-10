package ru.technews.dao.security;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.technews.dao.BaseDao;
import ru.technews.entity.security.RolesEntity;

@Repository
@Transactional
public class RolesDao extends BaseDao<RolesEntity> {
}
