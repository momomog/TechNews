package ru.technews.controller.profile;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;
import ru.technews.entity.profile.UserProfileDataEntity;
import ru.technews.entity.profile.UserProfilePhotoEntity;
import ru.technews.service.profile.UserProfileDataService;
import ru.technews.service.profile.UserProfilePhotoService;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Controller
@RequestMapping(value = "/profile")
public class ProfileController {

    private Logger logger = LoggerFactory.getLogger(ProfileController.class);

    @Autowired
    private UserProfileDataService userProfileDataService;

    @Autowired
    private UserProfilePhotoService userProfilePhotoService;

    // Получение данных профиля пользователя
    // Запрос без параметров - id пользователя из сессии, иначе из параметров
    @GetMapping
    public String getUserProfileData(@RequestParam(name = "id", required = false) Long id, ModelMap model) {
        UserProfileDataEntity user;

        if (id == null) {
            // Здесь будет браться ID пользователя из сессии
            Long sessionUserId = 1L;
            user = userProfileDataService.findById(sessionUserId);
        } else {
            user = userProfileDataService.findById(id);
        }

        model.addAttribute("user", user);
        return "profile/profile";
    }

    // Удаление профиля пользователя по id параметру
    // example: " /profile/delete?id=5 "
    @GetMapping(value = "delete", params = "id")
    public RedirectView deleteProfile(@RequestParam(name = "id") Long id) {
        userProfileDataService.deleteById(id);
        return new RedirectView("all");
    }

    // Редактирование профиля пользователя по id параметру
    // example: " /profile/update?id=5 "
    @PostMapping(params = "id", value = "/update")
    public RedirectView updateProfile(
            @RequestParam(value = "role") String role,
            @RequestParam(value = "firstName") String firstName,
            @RequestParam(value = "middleName") String middleName,
            @RequestParam(value = "lastName") String lastName,
            @RequestParam(value = "email") String email,
            @RequestParam(value = "skype") String skype,
            @RequestParam(value = "photo") MultipartFile photo,
            @RequestParam(value = "locationId") Long locationId,
            @RequestParam(value = "id") Long id) {
        UserProfileDataEntity user = userProfileDataService.findById(id);
        user.setFirstName(firstName);
        user.setMiddleName(middleName);
        user.setLastName(lastName);
        user.setRole(role);
        user.setEmail(email);
        user.setSkype(skype);
        user.setUserLocationId(locationId);

        // Если фото не загружено, то остаётся старое фото. Полное удаление фото при редактировании пока не предусмотрено.
        try {
            if (photo.getSize() != 0) {
                UserProfilePhotoEntity profilePhoto = userProfilePhotoService.findById(user.getUserAvatarId());
                profilePhoto.setName(photo.getOriginalFilename());
                profilePhoto.setPhotoContent(photo.getBytes());
                profilePhoto.setSize(photo.getSize());
                user.setProfilePhoto(profilePhoto);
            }

            userProfileDataService.update(user);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return new RedirectView("/profile");
    }

    // Получение всех профилей пользователей
    // example: " /profile/all "
    @GetMapping(value = "all")
    public String getProfilesList(ModelMap model) {
        List profiles = userProfileDataService.findAll();
        model.addAttribute("profiles", profiles);
        return "profile/profiles";
    }

    // Получение фото профиля по id параметру
    // example: img src=" ... /profile/photo?id=5"
    @ResponseBody
    @GetMapping(value = "/photo", params = "id", produces = MediaType.IMAGE_JPEG_VALUE)
    public byte[] getProfilePhoto(@RequestParam(name = "id") Long id) throws IOException {
        UserProfilePhotoEntity profilePhoto = userProfilePhotoService.findById(id);

        // Если у пользователя нет фото профиля, возвращаем общее фото профиля из папки resources
        if (profilePhoto.getPhotoContent().length == 0) {
            InputStream noProfileImageIS = getClass().getClassLoader().getResourceAsStream("/images/empty_profile_photo.jpg");
            if (noProfileImageIS != null) {
                return IOUtils.toByteArray(noProfileImageIS);
            } else {
                logger.error("Общее фото пользователя по пути \"resources/images/empty_profile_photo.jpg\" не найдено");
                return null;
            }
        }

        return profilePhoto.getPhotoContent();
    }
}