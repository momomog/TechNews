package ru.technews.entity.security;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;
import ru.technews.entity.BaseEntity;

import javax.persistence.*;

@Entity
@Table(name = "roles")
@Setter
@Getter
public class Role extends BaseEntity {

    @Enumerated(EnumType.STRING)
    @NaturalId
    @Column(length = 60)
    private RoleName name;

    public Role() {

    }

    public Role(RoleName name) {
        this.name = name;
    }

}
