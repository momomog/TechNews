package ru.technews.dao;

import org.springframework.stereotype.Repository;
import ru.technews.entity.MessagesEntity;

import javax.persistence.Query;
import java.util.List;

@Repository
public class MessageDao extends BaseDao<MessagesEntity> {
    // Сообщения двух пользователей
    public List<MessagesEntity> getDialogMessages(Long mainUserId, Long dialogUserId) {
        Query query = getCurrentSession().createQuery("from MessagesEntity where oneUserId=:mainUserId and twoUserId=:dialogUserId or oneUserId=:dialogUserId and twoUserId=:mainUserId");
        query.setParameter("mainUserId", mainUserId);
        query.setParameter("dialogUserId", dialogUserId);
        return query.getResultList();
    }
}
