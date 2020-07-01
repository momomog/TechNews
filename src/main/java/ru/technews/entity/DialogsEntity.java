package ru.technews.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Table(name = "dialogs")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DialogsEntity extends BaseEntity {
    // ИД первого собеседника
    @Column(name = "one_user_id")
    private Long oneUserId;

//    // Имя первого собеседника
//    @Formula("(select u.first_name from users u where u.id = one_user_id)")
//    private String oneUserFirstName;
//
//    // Username первого собеседника
//    @Formula("(select u.username from users u where u.id = one_user_id)")
//    private String oneUserUsername;
//
//    // ID фото первого собеседника
//    @Formula("(select u.photo_id from users_data u where u.id = one_user_id)")
//    private String oneUserPhotoId;

    // ИД второго собеседника
    @Column(name = "two_user_id")
    private Long twoUserId;

//    // Имя второго собеседника
//    @Formula("(select u.first_name from users u where u.id = two_user_id)")
//    private String twoUserFirstName;
//
//    // Username второго собеседника
//    @Formula("(select u.username from users u where u.id = two_user_id)")
//    private String twoUserUsername;
//
//    // ID фото второго собеседника
//    @Formula("(select u.photo_id from users_data u where u.id = two_user_id)")
//    private String twoUserPhotoId;
}
