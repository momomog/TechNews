package ru.technews.payload;


import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class LikeRequest {

    @NotBlank
    Long commentId;
}
