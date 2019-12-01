package ru.technews.dao.post;

import org.springframework.stereotype.Repository;
import ru.technews.common.PostCategoryConst;
import ru.technews.dao.BaseDao;
import ru.technews.entity.post.PostEntity;

import javax.persistence.Query;
import java.util.List;

@Repository
public class PostDao extends BaseDao<PostEntity> implements PostCategoryConst {

    // количество постов для пагинации
    private static Integer count = 5;

    public List findAllPostsByPage(Integer page) {
        Query query = getCurrentSession().createQuery("from PostEntity order by id desc").setFirstResult(count * (page - 1)).setMaxResults(count);
        return query.getResultList();
    }

    public List findAllCategoryPosts(Long section) {
        Query query = getCurrentSession().createQuery("FROM PostEntity  WHERE categoryId=:category order by id desc");
        query.setParameter("category", section);
        return query.getResultList();
    }

    public List findCategoryPostsByPage(Long category, Integer page) {
        Query query = getCurrentSession().createQuery("FROM PostEntity  WHERE categoryId=:category order by id desc");
        query.setParameter("category", category);
        return query.setFirstResult(count * (page - 1)).setMaxResults(count).getResultList();
    }
}
