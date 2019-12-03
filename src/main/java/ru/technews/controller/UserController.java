package ru.technews.controller;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.technews.entity.profile.UserProfileData;
import ru.technews.entity.security.User;
import ru.technews.exception.ResourceNotFoundException;
import ru.technews.payload.ActionCompleteResponse;
import ru.technews.payload.UserProfileDataRequest;
import ru.technews.payload.UserSummary;
import ru.technews.repository.UserRepository;
import ru.technews.security.CurrentUser;
import ru.technews.security.UserPrincipal;
import ru.technews.service.profile.UserProfileDataService;

import java.io.IOException;
import java.io.InputStream;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    UserProfileDataService userProfileDataService;

    // данные текущего авторизованного пользователя
    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        return new UserSummary(currentUser.getId(), currentUser.getUsername(), currentUser.getFirstName(),
                currentUser.getLastName(), currentUser.getEmail(), currentUser.getProfileData(), currentUser.getCreateAt());
    }

    // данные пользователя по юзернейму
    @GetMapping("/users/{username}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public UserSummary getUserProfile(@PathVariable(value = "username") String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        return new UserSummary(user.getId(), user.getUsername(), user.getFirstName(),
                user.getLastName(), user.getEmail(), user.getProfileData(), user.getCreatedAt());
    }

    // Обновление фото профиля
    @PostMapping(value = "/user/me/load-photo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity updateUserPhoto(@CurrentUser UserPrincipal currentUser,
                                          @RequestParam MultipartFile photo) throws IOException {
        UserProfileData profile = currentUser.getProfileData();

        if (photo.getBytes().length != 0) {
            profile.setPhoto(photo.getBytes());
        }

        userProfileDataService.update(profile);

        return ResponseEntity.ok(new ActionCompleteResponse(true));
    }

    // получение фото пользователя
    @GetMapping(value = "/user/photo", params = "id", produces = MediaType.IMAGE_JPEG_VALUE)
//    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public byte[] getProfilePhoto(@RequestParam(name = "id") Long id) throws IOException {
        UserProfileData profile = userProfileDataService.findById(id);

        // Если у пользователя нет фото профиля, возвращаем общее фото профиля из папки resources
        if (profile == null || profile.getPhoto() == null) {
            InputStream noProfileImageIS = getClass().getClassLoader().getResourceAsStream("/images/empty_profile_photo.jpg");
            if (noProfileImageIS != null) {
                return IOUtils.toByteArray(noProfileImageIS);
            } else {
                return null;
            }
        }

        return profile.getPhoto();
    }

    // обновление данных профиля
    @PostMapping(value = "/user/me/update")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> likeComment(@CurrentUser UserPrincipal currentUser,
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
