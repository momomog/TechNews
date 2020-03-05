package ru.technews.controller.post;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ru.technews.entity.post.CommentEntity;
import ru.technews.entity.post.PostEntity;
import ru.technews.payload.ActionCompleteResponse;
import ru.technews.payload.CommentUpdateRequest;
import ru.technews.payload.LikeRequest;
import ru.technews.security.CurrentUser;
import ru.technews.security.UserPrincipal;
import ru.technews.service.post.CommentService;
import ru.technews.service.post.PostService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/posts")
public class CommentController {

    @Autowired
    PostService postService;

    @Autowired
    CommentService commentService;

    //комментарии поста
    @GetMapping(value = "/{section}/post/{id}/comments")
    public Map<String, Object> getPostComments(@PathVariable("section") String section,
                                               @PathVariable("id") Long id) {
        return commentService.getPostComments(id);
    }

    // добавить новый комментарий
    @PostMapping(value = "/post/{postId}/new_comment")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> addNewComment(@CurrentUser UserPrincipal currentUser,
                                           @PathVariable("postId") Long postId,
                                           @RequestBody CommentEntity comment) {
        comment.setAuthorId(currentUser.getId());
        comment.setAuthorName(currentUser.getUsername());
        comment.setAuthorPhotoId(currentUser.getProfileData().getPhotoId());
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
    @PostMapping(value = "/post/{postId}/like_comment")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> likeComment(@CurrentUser UserPrincipal currentUser,
                                         @PathVariable("postId") Long postId,
                                         @RequestBody LikeRequest like) {
        CommentEntity comment = commentService.findById(like.getCommentId());
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
    @GetMapping(value = "/post/{postId}/delete_comment", params = "id")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> deleteComment(@PathVariable("postId") Long postId,
                                           @RequestParam(name = "id") Long id) {
        commentService.deleteComment(id);

        PostEntity post = postService.findById(postId);
        post.setCommentsCount(post.getCommentsCount() - 1);
        postService.update(post);

        return ResponseEntity.ok(new ActionCompleteResponse(true));
    }

    // обновление комментария
    @PostMapping(value = "/post/{postId}/update_comment", params = "id")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> updateComment(@PathVariable("postId") Long postId,
                                           @RequestParam(name = "id") Long id,
                                           @RequestBody CommentUpdateRequest commentRequest) {

        CommentEntity comment = commentService.findById(id);
        comment.setCommentText(commentRequest.getCommentText());
        commentService.update(comment);

        return ResponseEntity.ok(new ActionCompleteResponse(true));
    }

}
