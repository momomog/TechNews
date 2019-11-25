package ru.technews.entity.profile;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.technews.entity.BaseEntity;
import ru.technews.entity.security.User;

import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Table(name = "users_data")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileData extends BaseEntity {

    private LocalDateTime birthDate;

    private String country;

    private String city;

    private String vk;

    private String instagram;

    @JsonIgnore
    @OneToOne(mappedBy = "profileData")
    private User user;
}
