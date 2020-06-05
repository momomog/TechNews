package ru.technews.dao.post;

import org.springframework.stereotype.Repository;
import ru.technews.common.PostCategoryConst;
import ru.technews.common.Utils;
import ru.technews.dao.BaseDao;
import ru.technews.entity.post.PostEntity;

import javax.persistence.Query;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class PostDao extends BaseDao<PostEntity> implements PostCategoryConst {

    private static Map<String, Object> response = new HashMap<>();

    // количество постов для пагинации
    private static Integer count = 10;

    // количество рекомендованных постов для выбора
    private static Integer recommended = 10;

    public Map<String, Object> findCategoryPostsByPage(Long category, Integer page) {
        Query query;

        if (category == null) {
            query = getCurrentSession().createQuery("from PostEntity order by id desc");
        } else {
            query = getCurrentSession().createQuery("FROM PostEntity WHERE categoryId=:category order by id desc");
            query.setParameter("category", category);
        }

        List<PostEntity> allPosts = query.getResultList();
        response.put("postsCount", allPosts.size());

        List<PostEntity> postsByPage = query.setFirstResult(count * (page - 1)).setMaxResults(count).getResultList();
        response.put("posts", postsByPage);

        return response;
    }

    public List<PostEntity> findRecommendedPostsByCategory(Long category, Long postId) {
        Query query = getCurrentSession().createQuery("FROM PostEntity WHERE categoryId=:category order by date desc");
        query.setParameter("category", category);
        List<PostEntity> list = query.setMaxResults(recommended).getResultList();

        if (list.size() < recommended)
            return list;

        List<PostEntity> result = new ArrayList<>();

        while (result.size() < 3) {
            PostEntity post = list.get((int) (Math.random() * recommended));
            if (!post.getId().equals(postId) && !result.contains(post))
                result.add(post);
        }

        return result;
    }


    public List<PostEntity> searchPostsByQuery(String searchText) {
        Query query = getCurrentSession().createQuery("from PostEntity order by id desc");
        List<PostEntity> list = query.getResultList();
        List<PostEntity> resultList = new ArrayList<>();

        String[] splittedSearchText = searchText.trim().replaceAll("\u00AD", "").split("\\s+");
        ArrayList<String> searchWords = new ArrayList();
        for (String s: splittedSearchText)
            if (s.length() > 2)
                searchWords.add(s);

        for (PostEntity post : list) {
            if (Utils.stringContainsItemFromList(post.getTitle(), searchWords.toArray(new String[searchWords.size()]))
                    || Utils.stringContainsItemFromList(post.getPreDescription(), searchWords.toArray(new String[searchWords.size()])))
                resultList.add(post);
        }

        return resultList;
    }
}
