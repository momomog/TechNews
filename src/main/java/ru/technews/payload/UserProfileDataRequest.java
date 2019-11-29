package ru.technews.payload;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class UserProfileDataRequest {

    private String firstName;

    private String lastName;

    private LocalDateTime birthDate;

    private String country;

    private String city;

    private String vk;

    private String instagram;

    private String twitter;

    private String facebook;
}
