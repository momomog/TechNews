package ru.technews.service.post;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.technews.dao.BaseDao;
import ru.technews.dao.post.CommentDao;
import ru.technews.entity.post.CommentEntity;
import ru.technews.service.BaseService;

import java.util.Map;

@Service
public class CommentService extends BaseService<CommentEntity> {

    @Autowired
    CommentDao commentDao;

    @Override
    public BaseDao<CommentEntity> getBaseDao() {
        return commentDao;
    }

    public Map<String, Object> getPostComments(Long id) {
        return commentDao.getPostComments(id);
    }

    public void deleteCommentsByPostId(Long postId) {
        commentDao.deleteCommentsByPostId(postId);
    }
}
