package ru.technews.payload;

import lombok.Getter;
import lombok.Setter;
import ru.technews.entity.profile.UserProfileData;

import java.time.LocalDateTime;

@Getter
@Setter
public class UserSummary {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private UserProfileData profileData;
    private LocalDateTime createAt;

    public UserSummary(Long id, String username, String firstName, String lastName, String email,
                       UserProfileData profileData, LocalDateTime createAt) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.profileData = profileData;
        this.createAt = createAt;
    }

}
