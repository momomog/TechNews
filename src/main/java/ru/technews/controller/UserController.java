package ru.technews.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.technews.config.GoogleDrive;
import ru.technews.entity.profile.UserProfileData;
import ru.technews.entity.security.User;
import ru.technews.exception.ResourceNotFoundException;
import ru.technews.payload.ActionCompleteResponse;
import ru.technews.payload.UserProfileDataRequest;
import ru.technews.payload.UserSummary;
import ru.technews.repository.UserRepository;
import ru.technews.security.CurrentUser;
import ru.technews.security.UserPrincipal;
import ru.technews.service.post.CommentService;
import ru.technews.service.profile.UserProfileDataService;

import java.io.IOException;
import java.security.GeneralSecurityException;

import static ru.technews.config.GoogleDrive.userPhotoFolderId;

@RestController
@RequestMapping("/api")
public class UserController {

    UserRepository userRepository;
    UserProfileDataService userProfileDataService;
    CommentService commentService;
    GoogleDrive googleDrive;

    public UserController(UserRepository userRepository, UserProfileDataService userProfileDataService,
                          CommentService commentService, GoogleDrive googleDrive) {
        this.userRepository = userRepository;
        this.userProfileDataService = userProfileDataService;
        this.commentService = commentService;
        this.googleDrive = googleDrive;
    }

    // данные текущего авторизованного пользователя
    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {

        int userCommentsCount = commentService.getCommentsCountByUserId(currentUser.getId());

        return new UserSummary(
                currentUser.getId(),
                currentUser.getUsername(),
                currentUser.getFirstName(),
                currentUser.getLastName(),
                currentUser.getEmail(),
                currentUser.getProfileData(),
                currentUser.getCreateAt(),
                userCommentsCount
        );
    }

    // данные пользователя по юзернейму
    @GetMapping("/users/{username}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public UserSummary getUserProfile(@PathVariable(value = "username") String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        int userCommentsCount = commentService.getCommentsCountByUserId(user.getId());

        return new UserSummary(
                user.getId(),
                user.getUsername(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getProfileData(),
                user.getCreatedAt(),
                userCommentsCount
        );
    }

    // Обновление фото профиля
    @PostMapping(value = "/user/me/load-photo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<ActionCompleteResponse> updateUserPhoto(@CurrentUser UserPrincipal currentUser,
                                                                  @RequestParam MultipartFile photo) throws IOException, GeneralSecurityException, InterruptedException {
        UserProfileData profile = currentUser.getProfileData();

        if (photo.getSize() != 0) {
            String photoId = googleDrive.uploadPhoto(photo, userPhotoFolderId, profile.getPhotoId(), true);
            if (photoId != null)
                profile.setPhotoId(photoId);
        }

        userProfileDataService.update(profile);

        return ResponseEntity.ok(new ActionCompleteResponse(true));
    }

    // обновление данных профиля
    @PostMapping(value = "/user/me/update")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<ActionCompleteResponse> likeComment(@CurrentUser UserPrincipal currentUser,
                                                              @RequestBody UserProfileDataRequest profileRequest) {

        User user = userRepository.findUserByEmail(currentUser.getEmail());
        user.setFirstName(profileRequest.getFirstName());
        user.setLastName(profileRequest.getLastName());

        UserProfileData profileData = currentUser.getProfileData();

        if (profileRequest.getBirthDate() == null) {
            profileData.setBirthDate(null);
        } else {
            profileData.setBirthDate(profileRequest.getBirthDate().plusDays(1));
        }
        profileData.setVk(profileRequest.getVk());
        profileData.setInstagram(profileRequest.getInstagram());
        profileData.setTwitter(profileRequest.getTwitter());
        profileData.setFacebook(profileRequest.getFacebook());
        profileData.setCountry(profileRequest.getCountry());
        profileData.setCity(profileRequest.getCity());

        userRepository.save(user);
        userProfileDataService.update(profileData);

        return ResponseEntity.ok(new ActionCompleteResponse(true));
    }
}
