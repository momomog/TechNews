package ru.technews.payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentUpdateRequest {
    private String commentText;
}
