package ru.technews.service.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.technews.config.security.MyUserDetails;
import ru.technews.dao.security.UsersDao;
import ru.technews.entity.security.UsersEntity;


@Service
@ComponentScan(basePackages = "ru.ibs.intern.traineeship.dao")
public class MyUserDetailsService implements UserDetailsService {
    private static final Logger log = LoggerFactory.getLogger(MyUserDetailsService.class);

    @Autowired
    private UsersDao usersDao;

    @Transactional(readOnly = true)
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UsersEntity user = usersDao.findByUsername(email);

        if (user == null) {
            throw new UsernameNotFoundException("User not found.");
        }

        log.info("loadUserByUsername() : {}", email);

        return new MyUserDetails(user);
    }
}
