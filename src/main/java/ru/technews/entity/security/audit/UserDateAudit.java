package ru.technews.entity.security.audit;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;

import javax.persistence.MappedSuperclass;

/**
 * Created by rajeevkumarsingh on 19/08/17.
 */

@MappedSuperclass
@JsonIgnoreProperties(
        value = {"createdBy", "updatedBy"},
        allowGetters = true
)
@Getter
@Setter
public abstract class UserDateAudit extends DateAudit {

    @CreatedBy
    private Long createdBy;

    @LastModifiedBy
    private Long updatedBy;

}
