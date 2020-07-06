package ru.technews.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import ru.technews.dao.BaseDao;
import ru.technews.dao.VerificationTokenDao;
import ru.technews.entity.security.User;
import ru.technews.entity.security.VerificationTokenEntity;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class VerificationTokenService extends BaseService<VerificationTokenEntity> {

    @Autowired
    VerificationTokenDao verificationTokenDao;

    @Autowired
    private JavaMailSender mailSender;

    public VerificationTokenEntity getTokenByUserEmail(String email) {
        return verificationTokenDao.getTokenByUserEmail(email);
    }

    public VerificationTokenEntity confirmRegistration(User user, URI location) throws MessagingException {
        String token = UUID.randomUUID().toString();

        String recipientAddress = user.getEmail();
        String subject = "Подтверждение регистрации";
        String confirmationUrl
                = "<a href=\"http://" + location.getAuthority() + "/api/auth/registrationConfirm?email=" + recipientAddress + "&token=" + token + "\">ссылка</a>";
        String prefixMessage = "<h4>Для подтверждения регистрации на сайте tech-news.ru перейдите по ссылке:</h4>";
        String postfixMessage = "<h5>Внимание! Ссылка действительна в течение 24 часов</h5>";

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
        helper.setText(prefixMessage + confirmationUrl + postfixMessage, true);
        helper.setTo(recipientAddress);
        helper.setSubject(subject);
        helper.setFrom("momomogggq@gmail.com");
        mailSender.send(mimeMessage);

        VerificationTokenEntity verificationToken = new VerificationTokenEntity();
        verificationToken.setToken(token);
        verificationToken.setUserId(user.getId());
        verificationToken.setEmail(user.getEmail());
        verificationToken.setExpiryDate(LocalDateTime.now().plusDays(1));
        return verificationToken;
    }

    @Override
    public BaseDao<VerificationTokenEntity> getBaseDao() {
        return verificationTokenDao;
    }
}
