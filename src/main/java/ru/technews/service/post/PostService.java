package ru.technews.service.post;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.technews.dao.BaseDao;
import ru.technews.dao.post.PostDao;
import ru.technews.entity.post.PostEntity;
import ru.technews.service.BaseService;

import java.util.List;

@Service
public class PostService extends BaseService<PostEntity> {

    @Autowired
    PostDao postDao;

    public List findAllPostsByPage(Integer page) {
        return postDao.findAllPostsByPage(page);
    }

    public List findAllCategoryPosts(Long section) {
        return postDao.findAllCategoryPosts(section);
    }

    public List findCategoryPostsByPage(Long category, Integer page) {
        return postDao.findCategoryPostsByPage(category, page);
    }

    @Override
    public BaseDao<PostEntity> getBaseDao() {
        return postDao;
    }
}
