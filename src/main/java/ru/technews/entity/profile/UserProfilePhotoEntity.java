package ru.technews.entity.profile;

import ru.technews.entity.BaseEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "user_profile_avatar")
public class UserProfilePhotoEntity extends BaseEntity {

    // Оригинальное наименование файла
    @Column(name = "file_name")
    private String name;

    // Содержимое фото
    @Column(name = "photo_content")
    private byte[] photoContent;

    // Размер фото(в байтах)
    private Long size;

    @OneToOne(mappedBy = "profilePhoto")
    private UserProfileDataEntity user;

    public UserProfilePhotoEntity() {
    }

    public UserProfilePhotoEntity(String name, byte[] photoContent, Long size) {
        this.name = name;
        this.photoContent = photoContent;
        this.size = size;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public byte[] getPhotoContent() {
        return photoContent;
    }

    public void setPhotoContent(byte[] photoContent) {
        this.photoContent = photoContent;
    }

    public Long getSize() {
        return size;
    }

    public void setSize(Long size) {
        this.size = size;
    }

    public UserProfileDataEntity getUser() {
        return user;
    }

    public void setUser(UserProfileDataEntity user) {
        this.user = user;
    }
}
