package ru.technews.ws;

import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import ru.technews.config.SpringContext;
import ru.technews.entity.MessagesEntity;
import ru.technews.service.MessageService;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

@Service
@Controller
@ServerEndpoint(value = "/api/chat/{username}", decoders = MessageDecoder.class, encoders = MessageEncoder.class)
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
    public void onMessage(Session session, Message message) {
        MessagesEntity msg = new MessagesEntity(
                message.getOneUserId(),
                message.getOneUserFirstName(),
                message.getOneUserUsername(),
                message.getOneUserPhotoId(),
                message.getTwoUserId(),
                message.getTwoUserFirstName(),
                message.getTwoUserUsername(),
                message.getTwoUserPhotoId(),
                LocalDateTime.now(),
                message.getText()
        );
        messageService.save(msg);
        broadcast(message);
    }

    @OnClose
    public void onClose(Session session) {
        chatEndpoints.remove(this);
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        // Do error handling here
    }

    private static void broadcast(Message message) {
        chatEndpoints.forEach(endpoint -> {
            synchronized (endpoint) {
                try {
                    String username = endpoint.getSession().getPathParameters().get("username");
                    if (username.equals(message.getOneUserUsername()) || username.equals(message.getTwoUserUsername()))
                        endpoint.session.getBasicRemote().sendObject(message);
                } catch (IOException | EncodeException e) {
                    e.printStackTrace();
                }
            }
        });
    }

    public Session getSession() {
        return session;
    }
}