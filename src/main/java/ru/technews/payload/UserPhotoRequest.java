package ru.technews.payload;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class UserPhotoRequest {

    MultipartFile photo;

}
