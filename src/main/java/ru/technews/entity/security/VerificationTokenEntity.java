package ru.technews.entity.security;

import lombok.Getter;
import lombok.Setter;
import ru.technews.entity.BaseEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity(name = "verification_tokens")
@Getter
@Setter
public class VerificationTokenEntity extends BaseEntity implements Serializable {
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "token")
    private String token;

    @Column(name = "expiry_date")
    private LocalDateTime expiryDate;

    @Column(name = "email")
    private String email;
}