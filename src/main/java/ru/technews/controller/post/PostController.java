package ru.technews.controller.post;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.technews.entity.post.CommentEntity;
import ru.technews.entity.post.PostEntity;
import ru.technews.service.post.CommentService;
import ru.technews.service.post.PostService;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/posts")
public class PostController {

    @Autowired
    PostService postService;

    @Autowired
    CommentService commentService;

    private static Map<String, Object> response = new HashMap<>();

    @GetMapping(value = "/all/{page}")
    public Map getAllPosts(@PathVariable("page") Integer page) {
        List posts = postService.findAll();
        response.put("postsCount", posts.size());
        posts = postService.findAllPostsByPage(page);
        response.put("posts", posts);
        return response;
    }

    @GetMapping(value = "/mobile/{page}")
    public Map getNotebooksPosts(@PathVariable("page") Integer page) {
        List posts = postService.findAllMobilePosts();
        response.put("postsCount", posts.size());
        posts = postService.findMobilePostsByPage(page);
        response.put("posts", posts);
        return response;
    }

    @GetMapping(value = "/notebooks/{page}")
    public Map getHardwarePosts(@PathVariable("page") Integer page) {
        List posts = postService.findAllNotebooksPosts();
        response.put("postsCount", posts.size());
        posts = postService.findNotebooksPostsByPage(page);
        response.put("posts", posts);
        return response;
    }

    @GetMapping(value = "/hardware/{page}")
    public Map getMobilePosts(@PathVariable("page") Integer page) {
        List posts = postService.findAllHardwarePosts();
        response.put("postsCount", posts.size());
        posts = postService.findHardwarePostsByPage(page);
        response.put("posts", posts);
        return response;
    }

    //конкретный пост
    @GetMapping(value = "/{section}/post/{id}")
    public PostEntity getPostData(@PathVariable("section") String section,
                                  @PathVariable("id") Long id) {
        return postService.findById(id);
    }

    //комментарии поста
    @GetMapping(value = "/{section}/post/{id}/comments")
    public Map<String, Object> getPostComments(@PathVariable("section") String section,
                                               @PathVariable("id") Long id) {
        return commentService.getPostComments(id);
    }

    // добавить новый комментарий
    @PostMapping(value = "/post/{postId}/new_comment")
    public ResponseEntity<?> addNewComment(@PathVariable("postId") Long postId,
                                           @RequestBody CommentEntity comment) {
        comment.setDate(LocalDateTime.now());
        commentService.save(comment);

        PostEntity post = postService.findById(postId);
        post.setCommentsCount(post.getCommentsCount() + 1);
        postService.update(post);

        return ResponseEntity.ok("successful!");
    }
}

//    @GetMapping(value = "/{section}/{page}")
//    public Map getAllPosts(@PathVariable("section") String section,
//                           @PathVariable("page") Integer page) {
//
//        List posts = null;
//        switch (section){
//            case "all": posts = postService.findAll(); break;
//            case "mobile": posts = postService.findAllMobilePosts(); break;
//            case "notebooks": posts = postService.findAllNotebooksPosts(); break;
//            case "hardware": posts = postService.findAllHardwarePosts(); break;
//        }
//
//        response.put("postsCount", posts.size());
//        posts = postService.findAllPostsByPage(page);
//        response.put("posts", posts);
//        return response;
//    }
