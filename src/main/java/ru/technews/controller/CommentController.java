package ru.technews.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ru.technews.entity.CommentEntity;
import ru.technews.entity.PostEntity;
import ru.technews.payload.ActionCompleteResponse;
import ru.technews.payload.CommentUpdateRequest;
import ru.technews.security.CurrentUser;
import ru.technews.security.UserPrincipal;
import ru.technews.service.CommentService;
import ru.technews.service.PostService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/posts")
public class CommentController {

    PostService postService;
    CommentService commentService;

    public CommentController(PostService postService, CommentService commentService) {
        this.postService = postService;
        this.commentService = commentService;
    }

    //комментарии поста
    @GetMapping(value = "/{section}/post/{id}/comments")
    public Map<String, Object> getPostComments(@PathVariable("section") String section,
                                               @PathVariable("id") Long id) {
        return commentService.getPostComments(id);
    }

    // добавить новый комментарий
    @PostMapping(value = "/post/{postId}/new-comment")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<ActionCompleteResponse> addNewComment(@CurrentUser UserPrincipal currentUser,
                                                                @PathVariable("postId") Long postId,
                                                                @RequestBody CommentEntity comment) {
        comment.setAuthorId(currentUser.getId());
        comment.setDate(LocalDateTime.now());
        comment.setLikes(new Integer[]{});
        comment.setIsDeleted(false);
        commentService.save(comment);

        PostEntity post = postService.findById(postId);
        post.setCommentsCount(post.getCommentsCount() + 1);
        postService.update(post);

        return ResponseEntity.ok(new ActionCompleteResponse(true));
    }

    // лайк/дизлайк комментария
    @GetMapping(value = "/post/{postId}/like-comment", params = "id")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<ActionCompleteResponse> likeComment(@CurrentUser UserPrincipal currentUser,
                                                              @RequestParam(name = "id") Long id,
                                                              @PathVariable("postId") Long postId) {
        CommentEntity comment = commentService.findById(id);
        List<Integer> authorsList = new ArrayList<>(Arrays.asList(comment.getLikes()));

        Integer userId = currentUser.getId().intValue();
        if (!authorsList.contains(userId)) {
            authorsList.add(userId);
        } else {
            authorsList.remove(userId);
        }

        comment.setLikes(authorsList.toArray(new Integer[authorsList.size()]));
        commentService.update(comment);

        return ResponseEntity.ok(new ActionCompleteResponse(true));
    }

    // удаление комментария
    @GetMapping(value = "/post/{postId}/delete-comment", params = "id")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<ActionCompleteResponse> deleteComment(@PathVariable("postId") Long postId,
                                                                @RequestParam(name = "id") Long id) {
        commentService.deleteComment(id);

        PostEntity post = postService.findById(postId);
        post.setCommentsCount(post.getCommentsCount() - 1);
        postService.update(post);

        return ResponseEntity.ok(new ActionCompleteResponse(true));
    }

    // обновление комментария
    @PostMapping(value = "/post/{postId}/update-comment", params = "id")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<ActionCompleteResponse> updateComment(@PathVariable("postId") Long postId,
                                                                @RequestParam(name = "id") Long id,
                                                                @RequestBody CommentUpdateRequest commentRequest) {
        CommentEntity comment = commentService.findById(id);
        comment.setCommentText(commentRequest.getCommentText());
        commentService.update(comment);

        return ResponseEntity.ok(new ActionCompleteResponse(true));
    }
}
