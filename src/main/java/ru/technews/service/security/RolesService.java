//package ru.technews.service.security;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//import ru.technews.dao.BaseDao;
//import ru.technews.dao.security.RolesDao;
//import ru.technews.entity.security.RolesEntity;
//import ru.technews.service.BaseService;
//
//@Service
//@Transactional
//public class RolesService extends BaseService<RolesEntity> {
//
//    @Autowired
//    private RolesDao dao;
//
//    @Override
//    public BaseDao<RolesEntity> getBaseDao() {
//        return dao;
//    }
//}