package ru.technews.entity.profile;

import ru.technews.entity.BaseEntity;

import javax.persistence.*;

@Entity
@Table(name = "user_profile_data")
public class UserProfileDataEntity extends BaseEntity {

    private String role;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "middle_name")
    private String middleName;

    @Column(name = "last_name")
    private String lastName;

    private String email;

    private String skype;

    @Column(name = "user_location_id")
    private Long userLocationId;

    @Column(name = "user_avatar_id", insertable = false, updatable = false)
    private Long userAvatarId;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_avatar_id")
    private UserProfilePhotoEntity profilePhoto;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "user_location_id", referencedColumnName = "id", insertable = false, updatable = false)
    private CitiesEntity location;

    public UserProfileDataEntity() {
    }

    public UserProfileDataEntity(String role, String firstName, String middleName, String lastName, String email,
                                 String skype, Long userLocationId) {
        this.role = role;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.email = email;
        this.skype = skype;
        this.userLocationId = userLocationId;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSkype() {
        return skype;
    }

    public void setSkype(String skype) {
        this.skype = skype;
    }

    public Long getUserLocationId() {
        return userLocationId;
    }

    public void setUserLocationId(Long userLocationId) {
        this.userLocationId = userLocationId;
    }

    public Long getUserAvatarId() {
        return userAvatarId;
    }

    public void setUserAvatarId(Long userAvatarId) {
        this.userAvatarId = userAvatarId;
    }

    public UserProfilePhotoEntity getProfilePhoto() {
        return profilePhoto;
    }

    public void setProfilePhoto(UserProfilePhotoEntity profilePhoto) {
        this.profilePhoto = profilePhoto;
    }

    public CitiesEntity getLocation() {
        return location;
    }

    public void setLocation(CitiesEntity location) {
        this.location = location;
    }
}
