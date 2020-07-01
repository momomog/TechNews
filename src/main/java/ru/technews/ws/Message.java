package ru.technews.ws;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Message {
    private Long oneUserId;
    private String oneUserFirstName;
    private String oneUserUsername;
    private String oneUserPhotoId;
    private Long twoUserId;
    private String twoUserFirstName;
    private String twoUserUsername;
    private String twoUserPhotoId;
    private LocalDateTime date;
    private String text;
}