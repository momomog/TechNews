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

    public List findAllMobilePosts() {
        return postDao.findAllMobilePosts();
    }

    public List findAllNotebooksPosts() {
        return postDao.findAllNotebooksPosts();
    }

    public List findAllHardwarePosts() {
        return postDao.findAllHardwarePosts();
    }

    public List findMobilePostsByPage(Integer page) {
        return postDao.findMobilePostsByPage(page);
    }

    public List findNotebooksPostsByPage(Integer page) {
        return postDao.findNotebooksPostsByPage(page);
    }

    public List findHardwarePostsByPage(Integer page) {
        return postDao.findHardwarePostsByPage(page);
    }

    @Override
    public BaseDao<PostEntity> getBaseDao() {
        return postDao;
    }
}
