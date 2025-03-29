package com.warmhelp.app.controllers;

import com.warmhelp.app.dtos.auth.CheckTokenRequest;
import com.warmhelp.app.dtos.auth.LoginRequest;
import com.warmhelp.app.dtos.auth.LoginResponse;
import com.warmhelp.app.dtos.auth.RegisterRequest;
import com.warmhelp.app.services.UserService;
import com.warmhelp.app.models.User;
import com.warmhelp.app.models.UserInfo;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(this.userService.getAllUsers());
    }

    @GetMapping("/users-info")
    public ResponseEntity<List<UserInfo>> getAllUsersInfo() {
        return ResponseEntity.ok(this.userService.getAllUsersInfo());
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest credentials) {
        try {
            LoginResponse loginResponse = this.userService.login(credentials);
            return ResponseEntity.ok(loginResponse);
        }
        catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        try {
            User user = this.userService.createUser(registerRequest);
            return ResponseEntity.ok(user);
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @PostMapping("/check-token")
    public ResponseEntity<Boolean> checkToken(@RequestBody CheckTokenRequest checkTokenRequest) {
        return ResponseEntity.ok(this.userService.checkToken(checkTokenRequest));
    }
}
