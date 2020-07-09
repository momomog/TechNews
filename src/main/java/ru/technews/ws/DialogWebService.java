package ru.technews.ws;

import ru.technews.config.SpringContext;
import ru.technews.entity.MessageEntity;
import ru.technews.service.MessageService;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

@ServerEndpoint(value = "/api/chat/{username}", decoders = PayloadDecoder.class, encoders = PayloadEncoder.class)
public class DialogWebService {

    MessageService messageService = SpringContext.getBean(MessageService.class);
    private Session session;
    private static final Set<DialogWebService> chatEndpoints = new CopyOnWriteArraySet<>();
    private static HashMap<String, String> users = new HashMap<>();

    @OnOpen
    public void onOpen(Session session, @PathParam("username") String username) {
        this.session = session;
        chatEndpoints.add(this);

        boolean isInclude = false;
        for (String user : users.values()) {
            if (user.equals(username)) {
                isInclude = true;
                break;
            }
        }
        if (!isInclude)
            users.put(session.getId(), username);
    }

    @OnMessage
    public void onMessage(Session session, Payload payload) {
        if (payload.getIsWriting() == null) {
            if (payload.getIsRead() != null) {
                MessageEntity msg = new MessageEntity(
                        payload.getMainUserId(),
                        payload.getMainUserFirstName(),
                        payload.getMainUserUsername(),
                        payload.getMainUserPhotoId(),
                        payload.getDialogUserId(),
                        payload.getDialogUserFirstName(),
                        payload.getDialogUserUsername(),
                        payload.getDialogUserPhotoId(),
                        LocalDateTime.now(),
                        payload.getText(),
                        payload.getIsRead()
                );
                messageService.save(msg);
                return;
            }
        }
        broadcast(payload);
    }

    @OnClose
    public void onClose(Session session) {
        chatEndpoints.remove(this);
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        // Do error handling here
    }

    private static void broadcast(Payload payload) {
        chatEndpoints.forEach(endpoint -> {
            synchronized (endpoint) {
                try {
                    String username = endpoint.getSession().getPathParameters().get("username");
                    // отправка статуса о наборе текста
                    if (Objects.nonNull(payload.getIsWriting())) {
                        if (username.equals(payload.getDialogUserUsername()))
                            endpoint.session.getBasicRemote().sendObject(payload);
                    } else {
                        // отправка сообщения
                        if (username.equals(payload.getMainUserUsername()) || username.equals(payload.getDialogUserUsername()))
                            endpoint.session.getBasicRemote().sendObject(payload);
                    }
                } catch (IOException | EncodeException e) {
                    e.printStackTrace();
                }
            }
        });
    }

    public Session getSession() {
        return this.session;
    }
}