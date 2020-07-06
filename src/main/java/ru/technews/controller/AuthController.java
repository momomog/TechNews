package ru.technews.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import ru.technews.entity.UserProfileData;
import ru.technews.entity.security.Role;
import ru.technews.entity.security.RoleName;
import ru.technews.entity.security.User;
import ru.technews.entity.security.VerificationTokenEntity;
import ru.technews.exception.AppException;
import ru.technews.payload.*;
import ru.technews.repository.RoleRepository;
import ru.technews.repository.UserRepository;
import ru.technews.security.JwtTokenProvider;
import ru.technews.security.UserPrincipal;
import ru.technews.service.VerificationTokenService;

import javax.mail.MessagingException;
import javax.validation.Valid;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.Collections;

import static ru.technews.config.GoogleDriveConfig.defaultProfilePhotoId;

@Controller
@RequestMapping("/api/auth")
public class AuthController {
    AuthenticationManager authenticationManager;
    UserRepository userRepository;
    RoleRepository roleRepository;
    PasswordEncoder passwordEncoder;
    JwtTokenProvider tokenProvider;

    @Autowired
    VerificationTokenService tokenService;

    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository,
                          RoleRepository roleRepository, PasswordEncoder passwordEncoder, JwtTokenProvider tokenProvider) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    // Авторизация
    @PostMapping("/signin")
    @ResponseBody
    public ResponseEntity authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsernameOrEmail(),
                        loginRequest.getPassword()
                )
        );

        UserPrincipal user = (UserPrincipal) authentication.getPrincipal();
        if (user.getEnabled()) {
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = tokenProvider.generateToken(authentication);
            return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
        } else {
            return ResponseEntity.ok(new ApiResponse(false, "Confirm your email"));
        }
    }

    // Регистрация
    @PostMapping("/signup")
    @ResponseBody
    public ResponseEntity registerUser(@Valid @RequestBody SignUpRequest signUpRequest) throws MessagingException {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity(new ApiResponse(false, "Данное имя пользователя уже занято!"),
                    HttpStatus.BAD_REQUEST);
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity(new ApiResponse(false, "Данный почтовый адрес уже занят!"),
                    HttpStatus.BAD_REQUEST);
        }

        UserProfileData profileData = new UserProfileData();
        profileData.setPhotoId(defaultProfilePhotoId);

        User user = new User(signUpRequest.getFirstName(), signUpRequest.getLastName(), signUpRequest.getUsername(),
                signUpRequest.getEmail(), signUpRequest.getPassword(), profileData, false);

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new AppException("User Role not set."));

        user.setRoles(Collections.singleton(userRole));

        User result = userRepository.save(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath()
                .path("/users/{username}")
                .buildAndExpand(result.getUsername())
                .toUri();

        VerificationTokenEntity token = tokenService.confirmRegistration(result, location);
        tokenService.save(token);

        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }

    // Проверка доступности юзернейма
    @GetMapping("/user/checkUsernameAvailability")
    @ResponseBody
    public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String username) {
        Boolean isAvailable = !userRepository.existsByUsername(username);
        return new UserIdentityAvailability(isAvailable);
    }

    // Проверка доступности почты
    @GetMapping("/user/checkEmailAvailability")
    @ResponseBody
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !userRepository.existsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/registrationConfirm")
    public ModelAndView getTokenVerificationPage(@RequestParam(value = "email") String email,
                                                 @RequestParam(value = "token") String token) {
        ModelAndView modelAndView = new ModelAndView("token-verification");
        String message;

        if (email == null && token == null) {
            message = "При активации почтового аккаунта произошла ошибка. Проверьте правильность ссылки";
        } else {
            User user = userRepository.findUserByEmail(email);
            if (user == null) {
                message = "Пользователя с данным почтовым адресом не существует. Проверьте правильность введенных данных";
            } else if (user.getEnabled()) {
                message = "При активации почтового аккаунта произошла ошибка. Данный аккаунт уже активирован";
            } else {
                VerificationTokenEntity verToken = tokenService.getTokenByUserEmail(email);
                if (verToken == null) {
                    message = "При активации почтового аккаунта произошла ошибка. Проверьте правильность ссылки";
                } else {
                    if (LocalDateTime.now().isAfter(verToken.getExpiryDate())) {
                        message = "С момента формирования ссылки прошло 24 часа. Данная ссылка более недействительна";
                    } else if (!verToken.getToken().equals(token)) {
                        message = "При активации почтового аккаунта произошла ошибка. Неверный токен активации";
                    } else {
                        user.setEnabled(true);
                        userRepository.save(user);
                        message = "Ваш аккаунт успешно активирован";
                    }
                }
            }
        }
        modelAndView.addObject("message", message);
        return modelAndView;
    }
}
