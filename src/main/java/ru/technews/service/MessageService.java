package ru.technews.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.technews.dao.BaseDao;
import ru.technews.dao.MessageDao;
import ru.technews.entity.MessagesEntity;

import java.util.List;

@Service
public class MessageService extends BaseService<MessagesEntity> {
    @Autowired
    MessageDao messageDao;

    @Override
    public BaseDao<MessagesEntity> getBaseDao() {
        return messageDao;
    }

    public List<MessagesEntity> getDialogMessages(Long mainUserId, Long dialogUserId) {
        return messageDao.getDialogMessages(mainUserId, dialogUserId);
    }
}
