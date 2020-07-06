package ru.technews.dao;

import org.springframework.stereotype.Repository;
import ru.technews.entity.security.VerificationTokenEntity;

import javax.persistence.Query;
import java.util.List;

@Repository
public class VerificationTokenDao extends BaseDao<VerificationTokenEntity> {

    public VerificationTokenEntity getTokenByUserEmail(String email) {
        Query query = getCurrentSession().createQuery("FROM verification_tokens WHERE email=:email");
        query.setParameter("email", email);
        List<VerificationTokenEntity> result = query.getResultList();

        return result.get(0);
    }
}
