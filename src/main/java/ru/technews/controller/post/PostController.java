package ru.technews.controller.post;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.technews.common.PostCategoryConst;
import ru.technews.entity.post.PostEntity;
import ru.technews.service.post.PostService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/posts")
public class PostController implements PostCategoryConst {

    @Autowired
    PostService postService;

    private static Map<String, Object> response = new HashMap<>();

    // список постов по секциям
    @GetMapping(value = "/{section}/{page}")
    public Map getAllPosts(@PathVariable("section") String section,
                           @PathVariable("page") Integer page) {
        List posts = null;

        switch (section) {
            case ALL_POSTS:
                posts = postService.findAll(); break;
            case MOBILE:
                posts = postService.findAllCategoryPosts(CATEGORY_MOBILE); break;
            case NOTEBOOKS:
                posts = postService.findAllCategoryPosts(CATEGORY_NOTEBOOKS); break;
            case HARDWARE:
                posts = postService.findAllCategoryPosts(CATEGORY_HARDWARE); break;
            case OTHER:
                posts = postService.findAllCategoryPosts(CATEGORY_OTHER); break;
        }
        response.put("postsCount", posts.size());

        switch (section) {
            case ALL_POSTS:
                posts = postService.findAllPostsByPage(page); break;
            case MOBILE:
                posts = postService.findCategoryPostsByPage(CATEGORY_MOBILE, page); break;
            case NOTEBOOKS:
                posts = postService.findCategoryPostsByPage(CATEGORY_NOTEBOOKS, page); break;
            case HARDWARE:
                posts = postService.findCategoryPostsByPage(CATEGORY_HARDWARE, page); break;
            case OTHER:
                posts = postService.findCategoryPostsByPage(CATEGORY_OTHER, page); break;
        }
        response.put("posts", posts);

        return response;
    }

    // данные конкретного поста
    @GetMapping(value = "/{section}/post/{id}")
    public PostEntity getPostData(@PathVariable("section") String section,
                                  @PathVariable("id") Long id) {
        return postService.findById(id);
    }
}


