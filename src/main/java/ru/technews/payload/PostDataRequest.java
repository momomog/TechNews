package ru.technews.payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostDataRequest {

    private String title;

    private Long categoryId;

    private Integer rate;

    private String preDescription;

    private String fullDescription;
}
