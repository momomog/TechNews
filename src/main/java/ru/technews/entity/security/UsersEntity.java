package ru.technews.entity.security;

import ru.technews.entity.BaseEntity;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * Таблица пользователей (для авторизации)
 *
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
    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles",
            joinColumns = { @JoinColumn(name = "user_id") },
            inverseJoinColumns = { @JoinColumn(name = "role_id") })
    private Set<RolesEntity> authorities = new HashSet<>();

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
}

