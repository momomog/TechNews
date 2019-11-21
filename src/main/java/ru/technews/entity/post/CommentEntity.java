package ru.technews.entity.post;

import lombok.Getter;
import lombok.Setter;
import ru.technews.entity.BaseEntity;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "comments")
@Getter
@Setter
public class CommentEntity extends BaseEntity {

    // Содержимое комментария
    @Column(name = "comment_text")
    private String commentText;

    // ID автора комментария
    @Column(name = "author_id")
    private Long authorId;

    // Имя автор комментария
    @Column(name = "author_name")
    private String authorName;

    // Дата комментария
    @Column(name = "date", columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private LocalDateTime date;

    // Пост, к которому относится комментарий
    @Column(name = "post_id")
    private Long postId;

    // Пост, к которому относится комментарий
    @Column(name = "likes_count")
    private List<Long> likesCount;
}
