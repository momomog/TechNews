package ru.technews.dao;

import org.springframework.stereotype.Repository;
import ru.technews.entity.DialogEntity;
import ru.technews.entity.MessageEntity;
import ru.technews.entity.security.User;

import javax.persistence.Query;
import java.util.*;

@Repository
public class DialogDao extends BaseDao<DialogEntity> {
    // Список людей, с кем у текущего пользователя есть диалоги
    public List<Map> getDialogUsers(Long mainUserId) {

        List<Map> response = new ArrayList<>();
        Query query;
        query = getCurrentSession().createQuery("from DialogEntity where mainUserId=:mainUserId or dialogUserId=:mainUserId");
        query.setParameter("mainUserId", mainUserId);
        List<DialogEntity> dialogs = query.getResultList();
        Set<Long> userIds = new HashSet<>();
        for (DialogEntity dlg : dialogs) {
            if (dlg.getMainUserId().equals(mainUserId))
                userIds.add(dlg.getDialogUserId());
            else
                userIds.add(dlg.getMainUserId());
        }

        List<User> users = new ArrayList<>();
        if (userIds.size() > 0) {
            query = getCurrentSession().createQuery("from User where id in (:userIds)");
            query.setParameter("userIds", userIds);
            users = query.getResultList();
        }

        for (User u: users) {
            Map<String, Object> dialogData = new HashMap<>();
            query = getCurrentSession().createQuery("from MessageEntity where mainUserId=:mainUserId and dialogUserId=:mainUserId and isRead=false" +
                    " or mainUserId=:dialogUserId and dialogUserId=:mainUserId and isRead=false ");
            query.setParameter("mainUserId", mainUserId);
            query.setParameter("dialogUserId", u.getId());
            List<MessageEntity> messages = query.getResultList();
            dialogData.put("user", u);
            dialogData.put("messages", messages);
            response.add(dialogData);
        }
        return response;
    }

    // создание диалога
    public boolean createDialog(Long mainUserId, Long dialogUserId) {
        Query query;
        query = getCurrentSession().createQuery("from DialogEntity where mainUserId=:mainUserId and dialogUserId=:dialogUserId or mainUserId=:dialogUserId and dialogUserId=:mainUserId");
        query.setParameter("mainUserId", mainUserId);
        query.setParameter("dialogUserId", dialogUserId);
        List<DialogEntity> dialogs = query.getResultList();

        if (dialogs.size() > 0) {
            return false;
        } else {
            DialogEntity dialogsEntity = new DialogEntity();
            dialogsEntity.setMainUserId(mainUserId);
            dialogsEntity.setDialogUserId(dialogUserId);
            this.save(dialogsEntity);
            return true;
        }
    }
}
