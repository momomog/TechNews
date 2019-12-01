package ru.technews.payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ActionCompleteResponse {

    private Boolean isComplete;

    public ActionCompleteResponse(Boolean isComplete) {
        this.isComplete = isComplete;
    }

}
