package ru.ibs.intern.traineeship.entity.security;

import ru.ibs.intern.traineeship.entity.BaseEntity;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Таблица ролей пользователей (для авторизации)
 *  INTERN, MENTOR, HR
 */
@Entity
@Table(name = "roles")
public class RolesEntity extends BaseEntity {

    // Наименование роли
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

