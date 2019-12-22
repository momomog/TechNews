package ru.technews.controller.post;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.technews.common.PostCategoryConst;
import ru.technews.config.GoogleDrive;
import ru.technews.entity.post.PostEntity;
import ru.technews.payload.ActionCompleteResponse;
import ru.technews.payload.PostDataRequest;
import ru.technews.security.CurrentUser;
import ru.technews.security.UserPrincipal;
import ru.technews.service.post.CommentService;
import ru.technews.service.post.PostService;

import javax.validation.Valid;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static ru.technews.config.GoogleDrive.postPhotoFolderId;

@RestController
@RequestMapping(value = "/api/posts")
public class PostController implements PostCategoryConst {

    @Autowired
    PostService postService;

    @Autowired
    CommentService commentService;

    @Autowired
    GoogleDrive googleDrive;

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

    // Создание нового поста
    @PostMapping(value = "/new-post", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity createNewPost(@CurrentUser UserPrincipal currentUser,
                                        @RequestPart("post") @Valid PostEntity post,
                                        @RequestPart("photo") @Valid MultipartFile photo) throws IOException, InterruptedException, GeneralSecurityException {
        post.setAuthor(currentUser.getUsername());
        post.setAuthorId(currentUser.getId());
        post.setCommentsCount(0L);
        post.setDate(LocalDate.now());

        if (photo.getSize() != 0) {
            String photoId = googleDrive.uploadPhoto(photo, postPhotoFolderId, "new", false);
            if (photoId != null)
                post.setPhotoId(photoId);
        }

        Thread.sleep(700);

        postService.save(post);

        return ResponseEntity.ok(new ActionCompleteResponse(true));
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

    // Обновление фото поста
    @PostMapping(value = "/post/{id}/load-photo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity updateUserPhoto(@PathVariable("id") Long id,
                                          @RequestParam MultipartFile photo) throws IOException, InterruptedException, GeneralSecurityException {
        PostEntity post = postService.findById(id);

        if (photo.getSize() != 0) {
            String photoId = googleDrive.uploadPhoto(photo, postPhotoFolderId, post.getPhotoId(), true);
            if (photoId != null)
                post.setPhotoId(photoId);
        }

        // Искусственная задержка для полной обработки фото перед обновлением
        Thread.sleep(1200);
        postService.update(post);

        return ResponseEntity.ok(new ActionCompleteResponse(true));
    }
}