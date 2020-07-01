package ru.technews.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Formula;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Table(name = "messages")
@Entity
@Getter
@Setter
@NoArgsConstructor
public class MessagesEntity extends BaseEntity {
    // ИД первого собеседника
    @Column(name = "one_user_id")
    private Long oneUserId;

    // Имя первого собеседника
    @Formula("(select u.first_name from users u where u.id = one_user_id)")
    private String oneUserFirstName;

    // Username первого собеседника
    @Formula("(select u.username from users u where u.id = one_user_id)")
    private String oneUserUsername;

    // ID фото первого собеседника
    @Formula("(select u.photo_id from users_data u where u.id = one_user_id)")
    private String oneUserPhotoId;

    // ИД второго собеседника
    @Column(name = "two_user_id")
    private Long twoUserId;

    // Имя второго собеседника
    @Formula("(select u.first_name from users u where u.id = two_user_id)")
    private String twoUserFirstName;

    // Username второго собеседника
    @Formula("(select u.username from users u where u.id = two_user_id)")
    private String twoUserUsername;

    // ID фото второго собеседника
    @Formula("(select u.photo_id from users_data u where u.id = two_user_id)")
    private String twoUserPhotoId;

    // Дата сообщения
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy HH:mm")
    @Column(name = "date")
    private LocalDateTime date;

    // Текст сообщения
    @Column(name = "text")
    private String text;

    public MessagesEntity(Long oneUserId, String oneUserFirstName, String oneUserUsername, String oneUserPhotoId, Long twoUserId,
                          String twoUserUsername, String twoUserFirstName, String twoUserPhotoId, LocalDateTime date, String text) {
        this.oneUserId = oneUserId;
        this.oneUserFirstName = oneUserFirstName;
        this.oneUserUsername = oneUserUsername;
        this.oneUserPhotoId = oneUserPhotoId;
        this.twoUserId = twoUserId;
        this.twoUserUsername = twoUserUsername;
        this.twoUserFirstName = twoUserFirstName;
        this.twoUserPhotoId = twoUserPhotoId;
        this.date = date;
        this.text = text;
    }
}
