package ru.technews.dao.post;

import org.springframework.stereotype.Repository;
import ru.technews.dao.BaseDao;
import ru.technews.entity.post.CommentEntity;

import javax.persistence.Query;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class CommentDao extends BaseDao<CommentEntity> {

    // Взятие комментариев поста
    public Map<String, Object> getPostComments(Long id) {
        // искусственная задержка, тк после добавления комментария не всегда сразу подгружается добавленный комментарий
        try {
            Thread.sleep(300);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        Map<String, Object> response = new HashMap<>();
        Query query = getCurrentSession().createQuery("from CommentEntity where postId = :id order by id");
        query.setParameter("id", id);
        List comments = query.getResultList();
        List<Long> removeElementsId = new ArrayList<>();
        response.put("commentsCount", comments.size());

        // Формирование вложенности комментариев
        for (Object comment : comments) {
            CommentEntity com = (CommentEntity) comment;
            if (com.getParentCommentId() != null) {
                for (Object innerComment : comments) {
                    CommentEntity innerCom = (CommentEntity) innerComment;
                    if (com.getParentCommentId().equals(innerCom.getId())) {
                        innerCom.getReplyComments().add(com);
                        removeElementsId.add(com.getId());
                    }
                }
            }
        }

        // Удаление вложенных комментариев из общего списка
        boolean isCircle = true;
        do {
            out: for (Long el : removeElementsId) {
                for (Object comment : comments) {
                    CommentEntity com = (CommentEntity) comment;
                    if (com.getId().equals(el)) {
                        comments.remove(com);
                        continue out;
                    }
                }
                isCircle = false;
            }
        } while (isCircle);

        response.put("comments", comments);
        return response;
    }

    // Удаление всех комментариев поста
    public void deleteCommentsByPostId(Long postId) {
        Query query = getCurrentSession().createQuery("delete FROM CommentEntity  WHERE postId=:postId");
        query.setParameter("postId", postId);
        query.executeUpdate();
    }
}
