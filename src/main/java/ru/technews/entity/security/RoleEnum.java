package ru.ibs.intern.traineeship.entity.security;

public enum RoleEnum {

    /**
     * Интерн
     */
    ROLE_INTERN,

    /**
     * Ментор
     */
    ROLE_MENTOR,

    /**
     * HR
     */
    ROLE_HR;

    public Long getId() {
        Integer id = this.ordinal() + 1;
        return id.longValue();
    }
}