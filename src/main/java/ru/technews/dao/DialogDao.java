package ru.technews.dao;

import org.springframework.stereotype.Repository;
import ru.technews.entity.DialogEntity;
import ru.technews.entity.security.User;

import javax.persistence.Query;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Repository
public class DialogDao extends BaseDao<DialogEntity> {
    // Список людей, с кем у текущего пользователя есть диалоги
    public List<User> getDialogUsers(Long mainUserId) {
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
        return users;
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
