package ru.technews.entity.post;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
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

    // автор
    @Column(name = "author")
    private String author;

    // дата публикации
    @Column(name = "date", columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private LocalDate date;

    //изображение
    @JsonIgnore
    @Column(name = "photo")
    private byte[] photo;

    //категория новостей
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
}
