package ru.technews.entity.post;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;
import ru.technews.entity.BaseEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "posts")
@Getter
@Setter
public class PostEntity extends BaseEntity {

    // название
    @Column(name = "title")
    private String title;

    // короткое описание содержимого поста
    @Column(name = "pre_desc")
    private String preDescription;

    // полное содержимое поста
    @Column(name = "full_desc")
    private String fullDescription;

    // ID автора
    @Column(name = "author_id")
    private Long authorId;

    // автор
    @Column(name = "author")
    private String author;

    // дата публикации
    @Column(name = "date", columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private LocalDate date;

    // изображение
    @Column(name = "photo_id")
    private String photoId;

    // категория новостей
    @Column(name = "category_id")
    private Long categoryId;

    // Дата, время редактирования профиля
    @Column(name = "edit_date", columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private LocalDateTime editDate;

    // Имя редактора поста
    @Column(name = "edit_author_name")
    private String editAuthor;

    // ИД автора редактора поста
    @Column(name = "edit_author_id")
    private Long editAuthorId;

    // количество комментариев
    @Column(name = "comments_count")
    private Long commentsCount;

    // Массив ID авторов, которые оценили пост
    @Type(type = "ru.technews.payload.IntArrayUserType")
    @Column(
            name = "rates",
            columnDefinition = "integer[]"
    )
    private Integer[] rates;
}
