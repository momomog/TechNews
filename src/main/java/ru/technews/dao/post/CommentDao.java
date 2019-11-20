package ru.technews.dao.post;

import org.springframework.stereotype.Repository;
import ru.technews.dao.BaseDao;
import ru.technews.entity.post.CommentEntity;

import javax.persistence.Query;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class CommentDao extends BaseDao<CommentEntity> {

    public Map<String, Object> getPostComments(Long id) {
        try {
            Thread.sleep(200);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        Map<String, Object> response = new HashMap<>();
        Query query = getCurrentSession().createQuery("from CommentEntity where postId = :id order by id");
        query.setParameter("id", id);
        List comments = query.getResultList();
        response.put("comments", comments);
        response.put("commentsCount", comments.size());
        return response;
    }
}