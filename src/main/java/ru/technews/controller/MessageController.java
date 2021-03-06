package ru.technews.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ru.technews.entity.MessageEntity;
import ru.technews.payload.ActionCompleteResponse;
import ru.technews.security.CurrentUser;
import ru.technews.security.UserPrincipal;
import ru.technews.service.DialogService;
import ru.technews.service.MessageService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/api")
public class MessageController {
    @Autowired
    private MessageService messageService;
    @Autowired
    private DialogService dialogService;

    // список сообщений
    @GetMapping(value = "/messages/dialog")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<MessageEntity> getDialogMessages(@CurrentUser UserPrincipal currentUser,
                                                 @RequestParam(name = "userId") Long userId) {
        return messageService.getDialogMessages(currentUser.getId(), userId);
    }

    // пометка сообщений как прочитанные
    @GetMapping(value = "/messages/dialog/read")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<MessageEntity> markMessagesToRead(@CurrentUser UserPrincipal currentUser,
                                                  @RequestParam(name = "userId") Long userId) {
        return messageService.markMessagesToRead(currentUser.getId(), userId);
    }

    // создание диалога
    @GetMapping(value = "/dialogs/create")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<ActionCompleteResponse> createDialog(@CurrentUser UserPrincipal currentUser,
                                                               @RequestParam(name = "userId") Long userId) {
        boolean isCreated = dialogService.createDialog(currentUser.getId(), userId);
        return ResponseEntity.ok(new ActionCompleteResponse(isCreated));
    }

    // список диалогов
    @GetMapping(value = "/dialogs")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<Map> getDialogUsers(@CurrentUser UserPrincipal currentUser) {
        return dialogService.getDialogUsers(currentUser.getId());
    }
}
