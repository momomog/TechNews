//package ru.technews.entity.security;
//
//import ru.technews.entity.BaseEntity;
//
//import javax.persistence.Column;
//import javax.persistence.Entity;
//import javax.persistence.Table;
//
///**
// * Таблица связи пользователя с ролью (для авторизации)
// *
// */
//@Entity
//@Table(name = "user_roles")
//public class UserRolesEntity extends BaseEntity {
//
//    @Column(name = "user_id")
//    private Long userId;
//
//    @Column(name = "role_id")
//    private Long userRoleId;
//
//    public Long getUserId() {
//        return userId;
//    }
//
//    public void setUserId(Long userId) {
//        this.userId = userId;
//    }
//
//    public Long getUserRoleId() {
//        return userRoleId;
//    }
//
//    public void setUserRoleId(Long userRoleId) {
//        this.userRoleId = userRoleId;
//    }
//}
//
