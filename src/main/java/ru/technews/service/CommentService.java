package ru.technews.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.technews.dao.BaseDao;
import ru.technews.dao.CommentDao;
import ru.technews.entity.CommentEntity;

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

    public void deleteComment(Long commentId) {
        commentDao.deleteComment(commentId);
    }

    public void deleteCommentsByPostId(Long postId) {
        commentDao.deleteCommentsByPostId(postId);
    }

    public int getCommentsCountByUserId(Long userId) {
        return commentDao.getCommentsCountByUserId(userId);
    }
}
