package ru.technews.config.security;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

/**
 * Обработчик событий при создании/уничтожении сессии
 *
 */
public class SessionListener implements HttpSessionListener {

    @Override
    public void sessionCreated(HttpSessionEvent event) {
        System.out.println("---------------");
        System.out.println("session " + event.getSession().getId() + " is created");
        System.out.println("---------------");
    }

    @Override
    public void sessionDestroyed(HttpSessionEvent event) {
        System.out.println("-----------------");
        System.out.println("session " + event.getSession().getId() + " is destroyed");
        System.out.println("-----------------");
    }
}