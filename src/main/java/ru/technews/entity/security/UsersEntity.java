package ru.ibs.intern.traineeship.entity.security;

import ru.ibs.intern.traineeship.entity.BaseEntity;
import ru.ibs.intern.traineeship.entity.profile.UserProfileDataEntity;
import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * Таблица пользователей (для авторизации)
 */
@Entity
@Table(name = "users")
public class UsersEntity extends BaseEntity {

    // поле login
    @Column(unique = true)
    private String email;

    // поле password
    private String password;

    // роль
    @ManyToMany(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles",
            joinColumns = { @JoinColumn(name = "user_id") },
            inverseJoinColumns = { @JoinColumn(name = "role_id") })
    private Set<RolesEntity> authorities = new HashSet<>();

    @Column(name = "user_profile_id", insertable = false, updatable = false)
    private Long userId;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_profile_id")
    private UserProfileDataEntity userProfileData;

    public UsersEntity() {

    }

    public UsersEntity(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<RolesEntity> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<RolesEntity> authorities) {
        this.authorities = authorities;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public UserProfileDataEntity getUserProfileData() {
        return userProfileData;
    }

    public void setUserProfileData(UserProfileDataEntity userProfileData) {
        this.userProfileData = userProfileData;
    }
}

