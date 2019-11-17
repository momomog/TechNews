package ru.technews.entity.post;

import lombok.Getter;
import lombok.Setter;
import ru.technews.entity.BaseEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.time.LocalDate;

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

    //ссылка на изображение
    @Column(name = "image_url")
    private String imageUrl;

    //категория новостей
    @Column(name = "category_id")
    private Long categoryId;

    // количество комментариев
    @Column(name = "comments_count")
    private Long commentsCount;
}
