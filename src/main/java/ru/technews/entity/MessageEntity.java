package ru.technews.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Formula;
import org.hibernate.annotations.Type;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Table(name = "messages")
@Entity
@Getter
@Setter
public class MessageEntity extends BaseEntity {
    // ИД первого собеседника
    @Column(name = "main_user_id")
    private Long mainUserId;

    // Имя первого собеседника
    @Formula("(select u.first_name from users u where u.id = main_user_id)")
    private String mainUserFirstName;

    // Username первого собеседника
    @Formula("(select u.username from users u where u.id = main_user_id)")
    private String mainUserUsername;

    // ID фото первого собеседника
    @Formula("(select u.photo_id from users_data u where u.id = main_user_id)")
    private String mainUserPhotoId;

    // ИД второго собеседника
    @Column(name = "dialog_user_id")
    private Long dialogUserId;

    // Имя второго собеседника
    @Formula("(select u.first_name from users u where u.id = dialog_user_id)")
    private String dialogUserFirstName;

    // Username второго собеседника
    @Formula("(select u.username from users u where u.id = dialog_user_id)")
    private String dialogUserUsername;

    // ID фото второго собеседника
    @Formula("(select u.photo_id from users_data u where u.id = dialog_user_id)")
    private String dialogUserPhotoId;

    // Дата сообщения
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy HH:mm")
    @Column(name = "date")
    private LocalDateTime date;

    // Текст сообщения
    @Column(name = "text")
    private String text;

    // Признак того, что сообщение прочитано собеседником
    @Type(type = "numeric_boolean")
    @Column(name = "is_read")
    private Boolean isRead;

    public MessageEntity() {
    }

    public MessageEntity(Long mainUserId, String mainUserFirstName, String mainUserUsername, String mainUserPhotoId,
                         Long dialogUserId, String dialogUserUsername, String dialogUserFirstName,
                         String dialogUserPhotoId, LocalDateTime date, String text, Boolean isRead) {
        this.mainUserId = mainUserId;
        this.mainUserFirstName = mainUserFirstName;
        this.mainUserUsername = mainUserUsername;
        this.mainUserPhotoId = mainUserPhotoId;
        this.dialogUserId = dialogUserId;
        this.dialogUserUsername = dialogUserUsername;
        this.dialogUserFirstName = dialogUserFirstName;
        this.dialogUserPhotoId = dialogUserPhotoId;
        this.date = date;
        this.text = text;
        this.isRead = isRead;
    }
}
