package ru.technews.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.technews.dao.BaseDao;
import ru.technews.dao.DialogDao;
import ru.technews.entity.DialogsEntity;
import ru.technews.entity.security.User;

import java.util.List;

@Service
public class DialogService extends BaseService<DialogsEntity> {
    @Autowired
    DialogDao dialogDao;

    @Override
    public BaseDao<DialogsEntity> getBaseDao() {
        return dialogDao;
    }

    public List<User> getDialogUsers(Long mainUserId) {
        return dialogDao.getDialogUsers(mainUserId);
    }

    public Boolean createDialog(Long mainUserId, Long userId) {
        return dialogDao.createDialog(mainUserId, userId);
    }
}
