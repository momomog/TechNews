package ru.technews.payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostDataRequest {

    private String title;

    private String fullDescription;
}
