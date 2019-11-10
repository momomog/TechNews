package ru.technews.entity.profile;

import ru.technews.entity.BaseEntity;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "cities")
public class CitiesEntity extends BaseEntity {

    // Наименование города
    private String name;

    // Смещение времени относительно мск
    private String offset;

    @OneToMany(mappedBy = "location", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<UserProfileDataEntity> users;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOffset() {
        return offset;
    }

    public void setOffset(String offset) {
        this.offset = offset;
    }

    public Set<UserProfileDataEntity> getUsers() {
        return users;
    }

    public void setUsers(Set<UserProfileDataEntity> users) {
        this.users = users;
    }
}
