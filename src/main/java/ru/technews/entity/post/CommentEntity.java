package ru.technews.entity.post;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Formula;
import org.hibernate.annotations.Type;
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

    // Имя автора комментария
    @Formula("(select u.username from users u where u.id = author_id)")
    private String authorName;

    // ID фото автора комментария
    @Formula("(select u.photo_id from users_data u where u.id = author_id)")
    private String authorPhotoId;

    // Дата комментария
    @Column(name = "date", columnDefinition = "TIMESTAMP WITH TIME ZONE")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy HH:mm")
    private LocalDateTime date;

    // Пост, к которому относится комментарий
    @Column(name = "post_id")
    private Long postId;

    // Массив ID авторов, которым понравился комментарий
    @Type(type = "ru.technews.payload.IntArrayUserType")
    @Column(
            name = "likes",
            columnDefinition = "integer[]"
    )
    private Integer[] likes;

    // ИД комментария, к которому принадлежит данный комментарий
    @Column(name = "parent_comment_id")
    private Long parentCommentId;

    // Автор комментария, к которому принадлежит данный комментарий
    @Column(name = "parent_comment_author_name")
    private String parentCommentAuthorName;

    // Удалено ли содержимое комментария
    @Type(type = "numeric_boolean")
    @Column(name = "is_deleted")
    private Boolean isDeleted;

    @Transient
    private List<CommentEntity> replyComments = new ArrayList<>();
}
