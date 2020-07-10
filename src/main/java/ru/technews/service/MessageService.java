package ru.technews.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.technews.dao.BaseDao;
import ru.technews.dao.MessageDao;
import ru.technews.entity.MessageEntity;

import java.util.List;

@Service
public class MessageService extends BaseService<MessageEntity> {
    @Autowired
    MessageDao messageDao;

    @Override
    public BaseDao<MessageEntity> getBaseDao() {
        return messageDao;
    }

    public List<MessageEntity> getDialogMessages(Long mainUserId, Long dialogUserId) {
        return messageDao.getDialogMessages(mainUserId, dialogUserId);
    }

    public List<MessageEntity> markMessagesToRead(Long mainUserId, Long dialogUserId) {
        return messageDao.markMessagesToRead(mainUserId, dialogUserId);
    }
}
