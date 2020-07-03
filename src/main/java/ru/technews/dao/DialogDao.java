package ru.technews.dao;

import org.springframework.stereotype.Repository;
import ru.technews.entity.DialogsEntity;
import ru.technews.entity.security.User;

import javax.persistence.Query;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Repository
public class DialogDao extends BaseDao<DialogsEntity> {
    // Список людей, с кем у текущего пользователя есть диалоги
    public List<User> getDialogUsers(Long mainUserId) {
        Query query;
        query = getCurrentSession().createQuery("from DialogsEntity where oneUserId=:mainUserId or twoUserId=:mainUserId");
        query.setParameter("mainUserId", mainUserId);
        List<DialogsEntity> dialogs = query.getResultList();
        Set<Long> userIds = new HashSet<>();
        for (DialogsEntity dlg : dialogs) {
            if (dlg.getOneUserId().equals(mainUserId))
                userIds.add(dlg.getTwoUserId());
            else
                userIds.add(dlg.getOneUserId());
        }

        List<User> users = new ArrayList<>();
        if (userIds.size() > 0) {
            query = getCurrentSession().createQuery("from User where id in (:userIds)");
            query.setParameter("userIds", userIds);
            users = query.getResultList();
        }
        return users;
    }

    // создание даилога
    public boolean createDialog(Long mainUserId, Long userId) {
        Query query;
        query = getCurrentSession().createQuery("from DialogsEntity where oneUserId=:mainUserId and twoUserId=:userId or oneUserId=:userId and twoUserId=:mainUserId");
        query.setParameter("mainUserId", mainUserId);
        query.setParameter("userId", userId);
        List<DialogsEntity> dialogs = query.getResultList();

        if (dialogs.size() > 0) {
            return false;
        } else {
            DialogsEntity dialogsEntity = new DialogsEntity();
            dialogsEntity.setOneUserId(mainUserId);
            dialogsEntity.setTwoUserId(userId);
            this.save(dialogsEntity);
            return true;
        }
    }
}
