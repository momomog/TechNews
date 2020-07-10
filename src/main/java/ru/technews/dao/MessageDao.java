package ru.technews.dao;

import org.springframework.stereotype.Repository;
import ru.technews.entity.MessageEntity;

import javax.persistence.Query;
import java.util.List;

@Repository
public class MessageDao extends BaseDao<MessageEntity> {
    // Сообщения двух пользователей
    public List<MessageEntity> getDialogMessages(Long mainUserId, Long dialogUserId) {
        Query query = getCurrentSession().createQuery("from MessageEntity where mainUserId=:mainUserId and dialogUserId=:dialogUserId or mainUserId=:dialogUserId and dialogUserId=:mainUserId");
        query.setParameter("mainUserId", mainUserId);
        query.setParameter("dialogUserId", dialogUserId);
        return query.getResultList();
    }

    // Пометка сообщений как прочитанные
    public List<MessageEntity> markMessagesToRead(Long mainUserId, Long dialogUserId) {
        Query query = getCurrentSession().createQuery("from MessageEntity where mainUserId=:mainUserId and dialogUserId=:mainUserId and isRead=false" +
                " or mainUserId=:dialogUserId and dialogUserId=:mainUserId and isRead=false ");
        query.setParameter("mainUserId", mainUserId);
        query.setParameter("dialogUserId", dialogUserId);
        List<MessageEntity> messages = query.getResultList();

        for (MessageEntity msg : messages) {
            msg.setIsRead(true);
            this.save(msg);
        }
        return this.getDialogMessages(mainUserId, dialogUserId);
    }
}
