package ru.technews.service;

import org.springframework.stereotype.Service;
import ru.technews.dao.BaseDao;
import ru.technews.dao.PostDao;
import ru.technews.entity.PostEntity;
import ru.technews.service.BaseService;

import java.util.List;
import java.util.Map;

@Service
public class PostService extends BaseService<PostEntity> {
    PostDao postDao;

    public PostService(PostDao postDao) {
        this.postDao = postDao;
    }

    public Map<String, Object> findCategoryPostsByPage(Long category, Integer page) {
        return postDao.findCategoryPostsByPage(category, page);
    }

    public List<PostEntity> findRecommendedPostsByCategory(Long category, Long postId) {
        return postDao.findRecommendedPostsByCategory(category, postId);
    }

    public List<PostEntity> searchPostsByQuery(String searchText) {
        return postDao.searchPostsByQuery(searchText);
    }

    @Override
    public BaseDao<PostEntity> getBaseDao() {
        return postDao;
    }
}
