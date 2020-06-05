package ru.technews.entity.profile;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.technews.entity.BaseEntity;
import ru.technews.entity.security.User;

import javax.persistence.*;
import java.time.LocalDateTime;

@Table(name = "users_data")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileData extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy")
    private LocalDateTime birthDate;

    private String country;

    private String city;

    private String vk;

    private String instagram;

    private String twitter;

    private String facebook;

    @Column(name = "photo_id")
    private String photoId;

    @JsonIgnore
    @OneToOne(mappedBy = "profileData")
    private User user;
}
