package ru.technews.controller.profile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;
import ru.technews.entity.profile.UserProfileDataEntity;
import ru.technews.entity.profile.UserProfilePhotoEntity;
import ru.technews.service.profile.UserProfileDataService;

import java.io.IOException;


@Controller
public class ProfileRegistrationController {

    @Autowired
    private UserProfileDataService userProfileDataService;

    // Страница-форма регистрации пользователей
    @GetMapping(value = "/registration")
    public String getProfileRegistrationPage() {
        return "profile/profile-registration-form";
    }


    // Функция обработки данных с регистрационной формы
    @PostMapping(value = "/registration")
    public RedirectView addNewProfile(
            @RequestParam(value = "role") String role,
            @RequestParam(value = "firstName") String firstName,
            @RequestParam(value = "middleName") String middleName,
            @RequestParam(value = "lastName") String lastName,
            @RequestParam(value = "email") String email,
            @RequestParam(value = "skype") String skype,
            @RequestParam(value = "photo") MultipartFile photo,
            @RequestParam(value = "locationId") Long locationId) {
        UserProfileDataEntity user = new UserProfileDataEntity(role, firstName, middleName, lastName, email, skype, locationId);

        try {
            user.setProfilePhoto(new UserProfilePhotoEntity(
                    photo.getOriginalFilename(),
                    photo.getBytes(),
                    photo.getSize()
            ));

            userProfileDataService.save(user);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return new RedirectView("profile/all");
    }
}