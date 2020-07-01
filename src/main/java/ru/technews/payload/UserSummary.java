package ru.technews.payload;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import ru.technews.entity.UserProfileData;

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
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy")
    private LocalDateTime createAt;
    private Integer commentsCount;

    public UserSummary(Long id, String username, String firstName, String lastName, String email,
                       UserProfileData profileData, LocalDateTime createAt, Integer commentsCount) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.profileData = profileData;
        this.createAt = createAt;
        this.commentsCount = commentsCount;
    }

}
