package ru.technews.controller.post;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ru.technews.common.PostCategoryConst;
import ru.technews.entity.post.PostEntity;
import ru.technews.entity.profile.UserProfileData;
import ru.technews.payload.ActionCompleteResponse;
import ru.technews.service.post.CommentService;
import ru.technews.service.post.PostService;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/posts")
public class PostController implements PostCategoryConst {

    @Autowired
    PostService postService;

    @Autowired
    CommentService commentService;

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
    public PostEntity getPostDataById(@PathVariable("section") String section,
                                  @PathVariable("id") Long id) {
        return postService.findById(id);
    }

    // Удаление поста
    @GetMapping(value = "/delete-post", params = "id")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity getProfilePhoto(@RequestParam(name = "id") Long id) {
        commentService.deleteCommentsByPostId(id);
        postService.deleteById(id);

        return ResponseEntity.ok(new ActionCompleteResponse(true));
    }
}


