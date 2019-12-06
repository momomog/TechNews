package ru.technews.payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NewPostDataRequest {

    private String title;

    private Long category;

    private String fullDescription;
}
