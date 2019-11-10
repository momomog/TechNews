package ru.technews.service.profile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.technews.dao.BaseDao;
import ru.technews.dao.profile.CitiesDao;
import ru.technews.entity.profile.CitiesEntity;
import ru.technews.service.BaseService;

@Service
@Transactional
public class CitiesService extends BaseService<CitiesEntity> {

    @Autowired
    private CitiesDao dao;

    @Override
    public BaseDao<CitiesEntity> getBaseDao() {
        return dao;
    }
}