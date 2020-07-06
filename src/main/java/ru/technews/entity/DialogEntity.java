package ru.technews.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Table(name = "dialogs")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DialogEntity extends BaseEntity {
    // ИД первого собеседника
    @Column(name = "main_user_id")
    private Long mainUserId;

    // ИД второго собеседника
    @Column(name = "dialog_user_id")
    private Long dialogUserId;
}
