package ru.technews.ws;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Payload {
    private Long mainUserId;
    private String mainUserFirstName;
    private String mainUserUsername;
    private String mainUserPhotoId;
    private Long dialogUserId;
    private String dialogUserFirstName;
    private String dialogUserUsername;
    private String dialogUserPhotoId;
    private LocalDateTime date;
    private String text;
    private Boolean isWriting;
}