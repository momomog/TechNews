package ru.technews.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import ru.technews.common.PostCategoryConst;
import ru.technews.config.GoogleDrive;
import ru.technews.entity.PostEntity;
import ru.technews.payload.ActionCompleteResponse;
import ru.technews.payload.PostDataRequest;
import ru.technews.security.CurrentUser;
import ru.technews.security.UserPrincipal;
import ru.technews.service.CommentService;
import ru.technews.service.PostService;

import javax.validation.Valid;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static ru.technews.config.GoogleDrive.postPhotoFolderId;

@RestController
@RequestMapping(value = "/api/posts")
public class PostController implements PostCategoryConst {

    PostService postService;
    CommentService commentService;
    GoogleDrive googleDrive;

    public PostController(PostService postService, CommentService commentService, GoogleDrive googleDrive) {
        this.postService = postService;
        this.commentService = commentService;
        this.googleDrive = googleDrive;
    }

    // список постов по секциям
    @GetMapping(value = "/{section}/{page}")
    public Map<String, Object> getAllPosts(@PathVariable("section") String section,
                                           @PathVariable("page") Integer page) {
        switch (section) {
            case MOBILE:
                return postService.findCategoryPostsByPage(CATEGORY_MOBILE, page);
            case NOTEBOOKS:
                return postService.findCategoryPostsByPage(CATEGORY_NOTEBOOKS, page);
            case HARDWARE:
                return postService.findCategoryPostsByPage(CATEGORY_HARDWARE, page);
            case OTHER:
                return postService.findCategoryPostsByPage(CATEGORY_OTHER, page);
            case GAMES:
                return postService.findCategoryPostsByPage(CATEGORY_GAMES, page);
            case ALL_POSTS:
                return postService.findCategoryPostsByPage(null, page);
            default:
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    // поиск постов по названию
    @GetMapping(value = "/search", params = "search_query")
    public List<PostEntity> getSearchedPosts(@RequestParam(name = "search_query") String searchText) {

        return postService.searchPostsByQuery(searchText);
    }

    // рекомендуемые посты
    @GetMapping(value = "/{categoryId}/recommended", params = "id")
    public List<PostEntity> getRecommendedPosts(@PathVariable("categoryId") Long categoryId,
                                                @RequestParam(name = "id") Long id) {
        return postService.findRecommendedPostsByCategory(categoryId, id);
    }

    // данные конкретного поста
    @GetMapping(value = "/post/{id}")
    public ResponseEntity<PostEntity> getPostDataById(@PathVariable("id") Long id) {
        PostEntity post = postService.findById(id);

        if (post == null)
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);

        return ResponseEntity.ok(post);
    }

    // Создание нового поста
    @PostMapping(value = "/new-post", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ActionCompleteResponse> createNewPost(@CurrentUser UserPrincipal currentUser,
                                                                @RequestPart("post") @Valid PostEntity post,
                                                                @RequestPart("photo") @Valid MultipartFile photo) throws IOException, InterruptedException, GeneralSecurityException {
        post.setAuthor(currentUser.getUsername());
        post.setAuthorId(currentUser.getId());
        post.setCommentsCount(0L);
        post.setDate(LocalDate.now());
        post.setRates(new Integer[]{});
        post.setRatedUsers(new Integer[]{});

        if (photo.getSize() != 0) {
            String photoId = googleDrive.uploadPhoto(photo, postPhotoFolderId, "new", false);
            if (photoId != null)
                post.setPhotoId(photoId);
        }

        Thread.sleep(700);
        postService.save(post);

        return ResponseEntity.ok(new ActionCompleteResponse(true));
    }

    // Создание нового поста из внешнего источника
    @PostMapping(value = "/new-post-outer-src")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ActionCompleteResponse> createNewPostFromOuterSrc(
            @CurrentUser UserPrincipal currentUser,
            @RequestBody PostEntity post) throws InterruptedException {
        post.setAuthor(currentUser.getUsername());
        post.setAuthorId(currentUser.getId());
        post.setCommentsCount(0L);
        post.setDate(LocalDate.now());
        post.setRates(new Integer[]{});
        post.setRatedUsers(new Integer[]{});

        postService.save(post);

        return ResponseEntity.ok(new ActionCompleteResponse(true));
    }

    // Изменений данных поста
    @PostMapping(value = "/post/update", params = "id", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ActionCompleteResponse> updatePostById(@RequestParam(name = "id") Long id,
                                                                 @CurrentUser UserPrincipal currentUser,
                                                                 @RequestPart("post") @Valid PostDataRequest postRequest,
                                                                 @RequestPart("photo") @Valid MultipartFile photo) throws IOException, GeneralSecurityException {
        PostEntity post = postService.findById(id);
        if (post != null) {
            post.setTitle(postRequest.getTitle());
            post.setPreDescription(postRequest.getPreDescription());
            post.setFullDescription(postRequest.getFullDescription());
            post.setCategoryId(postRequest.getCategoryId());
            post.setEditDate(LocalDateTime.now());
            post.setEditAuthorId(currentUser.getId());
            post.setEditAuthor(currentUser.getUsername());

            if (photo.getSize() != 0) {
                String photoId = googleDrive.uploadPhoto(photo, postPhotoFolderId, post.getPhotoId(), true);
                if (photoId != null)
                    post.setPhotoId(photoId);
            }

            postService.update(post);
        }

        return ResponseEntity.ok(new ActionCompleteResponse(true));
    }

    // Удаление поста
    @GetMapping(value = "/delete-post", params = "id")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ActionCompleteResponse> deletePostById(@RequestParam(name = "id") Long id) {
        commentService.deleteCommentsByPostId(id);
        postService.deleteById(id);

        return ResponseEntity.ok(new ActionCompleteResponse(true));
    }

    // Оценка поста
    @PostMapping(value = "/rate-post", params = "id")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<ActionCompleteResponse> ratePost(@RequestParam(name = "id") Long id,
                                                           @RequestBody PostDataRequest postRequest,
                                                           @CurrentUser UserPrincipal currentUser) {
        PostEntity post = postService.findById(id);

        List<Integer> ratesList = new ArrayList<>(Arrays.asList(post.getRates()));
        ratesList.add(postRequest.getRate());
        post.setRates(ratesList.toArray(new Integer[ratesList.size()]));

        List<Integer> authorsList = new ArrayList<>(Arrays.asList(post.getRatedUsers()));
        authorsList.add(currentUser.getId().intValue());
        post.setRatedUsers(authorsList.toArray(new Integer[authorsList.size()]));

        postService.update(post);

        return ResponseEntity.ok(new ActionCompleteResponse(true));
    }
}