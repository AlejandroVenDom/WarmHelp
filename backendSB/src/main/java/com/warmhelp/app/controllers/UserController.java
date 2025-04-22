package com.warmhelp.app.controllers;

import com.warmhelp.app.dtos.auth.*;
import com.warmhelp.app.services.UserService;
import com.warmhelp.app.models.User;
import com.warmhelp.app.models.UserInfo;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @PutMapping("/{id}/username")
    public ResponseEntity<String> updateUsername(@PathVariable Long id, @RequestBody UpdateUsernameRequest updateUsernameRequest){
        userService.changeUsername(id, updateUsernameRequest.getNewUsername());
        return ResponseEntity.ok("Username actualizado correctamente");
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePwd(@RequestBody ChangePasswordRequest request){
        try {
            userService.changePassword(request);
            return ResponseEntity.ok(Map.of("message", "Contraseña actualizada con éxito"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Error interno del servidor"));
        }
    }


    @PostMapping("/{id}/update")
    public ResponseEntity<UserInfo> updateUser(@PathVariable Long id, @RequestBody UpdateUserInfoRequest request){
        UserInfo updateUser = userService.updateUserInfo(id, request);
        return ResponseEntity.ok(updateUser);
    }

}
