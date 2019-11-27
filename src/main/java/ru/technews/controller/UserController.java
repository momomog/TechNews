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

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        return new UserSummary(currentUser.getId(), currentUser.getUsername(), currentUser.getFirstName(),
                currentUser.getLastName(), currentUser.getEmail(), currentUser.getProfileData(), currentUser.getCreateAt());
    }

    @GetMapping("/users/{username}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public UserSummary getUserProfile(@PathVariable(value = "username") String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        return new UserSummary(user.getId(), user.getUsername(), user.getFirstName(),
                user.getLastName(), user.getEmail(), user.getProfileData(), user.getCreatedAt());
    }

    @PostMapping(value = "/user/me/load_photo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity getUserPhoto(@CurrentUser UserPrincipal currentUser,
                                       @RequestParam MultipartFile photo) throws IOException {
        UserProfileData profile = currentUser.getProfileData();
        if (photo.getBytes() != null){
            profile.setPhoto(photo.getBytes());
        }

        userProfileDataService.update(profile);

        return ResponseEntity.ok("Profile photo was update");
    }

    @ResponseBody
    @GetMapping(value = "/user/photo", params = "id", produces = MediaType.IMAGE_JPEG_VALUE)
//    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public byte[] getProfilePhoto(@RequestParam(name = "id") Long id) throws IOException {
        UserProfileData profilePhoto = userProfileDataService.findById(id);

        // Если у пользователя нет фото профиля, возвращаем общее фото профиля из папки resources
        if (profilePhoto == null || profilePhoto.getPhoto() == null) {
            InputStream noProfileImageIS = getClass().getClassLoader().getResourceAsStream("/images/empty_profile_photo.jpg");
            if (noProfileImageIS != null) {
                return IOUtils.toByteArray(noProfileImageIS);
            } else {
                return null;
            }
        }

        return profilePhoto.getPhoto();
    }
}
