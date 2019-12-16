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
        List<CommentEntity> deleteComments = new ArrayList<>();
        Query query = getCurrentSession().createQuery("from CommentEntity where postId = :id order by id");
        query.setParameter("id", id);
        List comments = query.getResultList();
        response.put("commentsCount", comments.size());

        // Создание копии комментариев
        List<CommentEntity> responseComments = new ArrayList<>();
        for (Object comment : comments) {
            CommentEntity com = (CommentEntity) comment;
            responseComments.add(com);
        }

        // Формирование вложенности комментариев
        for (int j = 0; j < comments.size(); j++) {
            CommentEntity com = (CommentEntity) comments.get(j);
            if (com.getParentCommentId() != null) {
                for (int i = 0; i < comments.size(); i++) {
                    CommentEntity innerCom = (CommentEntity) comments.get(i);
                    if (com.getParentCommentId().equals(innerCom.getId())) {
                        innerCom.getReplyComments().add(responseComments.get(j));
                        deleteComments.add(responseComments.get(j));
                    }
                }
            }
        }

        // Удаление вложенных комментариев из общего списка
        for (CommentEntity el : deleteComments) {
            responseComments.remove(el);
        }

        response.put("comments", responseComments);
        return response;
    }

    // Удаление комментария поста
    public void deleteComment(Long commentId) {
        Query query = getCurrentSession().createQuery("from CommentEntity where parentCommentId=:commentId");
        query.setParameter("commentId", commentId);
        List comments = query.getResultList();

        if (comments.size() > 0) {
            CommentEntity comment = getCurrentSession().get(CommentEntity.class, commentId);
            comment.setCommentText("Данный комментарий был удален автором или администратором");
            comment.setIsDeleted(true);
            getCurrentSession().saveOrUpdate(comment);
            return;
        }

        query = getCurrentSession().createQuery("delete FROM CommentEntity  WHERE id=:commentId");
        query.setParameter("commentId", commentId);
        query.executeUpdate();


    }

    // Удаление всех комментариев поста
    public void deleteCommentsByPostId(Long postId) {
        Query query = getCurrentSession().createQuery("delete FROM CommentEntity  WHERE postId=:postId");
        query.setParameter("postId", postId);
        query.executeUpdate();
    }
}
