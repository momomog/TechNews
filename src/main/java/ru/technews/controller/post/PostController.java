package ru.technews.controller.post;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ru.technews.common.PostCategoryConst;
import ru.technews.entity.post.PostEntity;
import ru.technews.payload.ActionCompleteResponse;
import ru.technews.payload.PostDataRequest;
import ru.technews.security.CurrentUser;
import ru.technews.security.UserPrincipal;
import ru.technews.service.post.CommentService;
import ru.technews.service.post.PostService;

import java.time.LocalDateTime;
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
                posts = postService.findAll();
                break;
            case MOBILE:
                posts = postService.findAllCategoryPosts(CATEGORY_MOBILE);
                break;
            case NOTEBOOKS:
                posts = postService.findAllCategoryPosts(CATEGORY_NOTEBOOKS);
                break;
            case HARDWARE:
                posts = postService.findAllCategoryPosts(CATEGORY_HARDWARE);
                break;
            case OTHER:
                posts = postService.findAllCategoryPosts(CATEGORY_OTHER);
                break;
        }
        response.put("postsCount", posts.size());

        switch (section) {
            case ALL_POSTS:
                posts = postService.findAllPostsByPage(page);
                break;
            case MOBILE:
                posts = postService.findCategoryPostsByPage(CATEGORY_MOBILE, page);
                break;
            case NOTEBOOKS:
                posts = postService.findCategoryPostsByPage(CATEGORY_NOTEBOOKS, page);
                break;
            case HARDWARE:
                posts = postService.findCategoryPostsByPage(CATEGORY_HARDWARE, page);
                break;
            case OTHER:
                posts = postService.findCategoryPostsByPage(CATEGORY_OTHER, page);
                break;
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
    public ResponseEntity deletePostById(@RequestParam(name = "id") Long id) {
        commentService.deleteCommentsByPostId(id);
        postService.deleteById(id);

        return ResponseEntity.ok(new ActionCompleteResponse(true));
    }

    // Изменений данных поста
    @PostMapping(value = "/post/update", params = "id")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity updatePostById(@RequestParam(name = "id") Long id,
                                         @CurrentUser UserPrincipal currentUser,
                                         @RequestBody PostDataRequest postRequest) {
        PostEntity post = postService.findById(id);
        if (post != null) {
            if (postRequest.getTitle() != null && !postRequest.getTitle().equals(""))
                post.setTitle(postRequest.getTitle());
            if (postRequest.getFullDescription() != null && !postRequest.getFullDescription().equals(""))
                post.setFullDescription(postRequest.getFullDescription());
            post.setEditDate(LocalDateTime.now());
            post.setEditAuthorId(currentUser.getId());
            post.setEditAuthor(currentUser.getUsername());
            postService.update(post);
        }

        return ResponseEntity.ok(new ActionCompleteResponse(true));
    }

}


