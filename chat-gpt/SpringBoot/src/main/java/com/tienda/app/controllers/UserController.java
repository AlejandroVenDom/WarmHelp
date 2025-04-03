package com.tienda.app.controllers;

import com.tienda.app.dtos.auth.*;
import com.tienda.app.models.User;
import com.tienda.app.models.UserInfo;
import com.tienda.app.repositories.UserInfoRepository;
import com.tienda.app.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/*
*
* http://localhost:8080/ -> Esta es la URL base para conectarnos a SpringBoot
* http://localhost:8080/api -> Si tenemos el context-path en app.properties, la URL base cambia
*
* * */

// http://localhost:8080/api/users

/*
*
* 200 -> Todo bien
* 201 -> Todo bien pero para update
* 204 -> Todo bien pero para borrar
* 400 -> Error de identification
* 401 -> Error de datos incorrectos
* 403 -> Permiso denegado
* 404 -> No se ha encontrado
* 500 -> Error en el servidor. Esto ocurre por fallo en el código
*
* */
@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {

    private final UserService userService;
    private final UserInfoRepository userInfoRepository;

    public UserController(UserService userService, UserInfoRepository userInfoRepository) {
        this.userService = userService;
        this.userInfoRepository = userInfoRepository;
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(this.userService.getAllUsers());
    }

    // http://localhost:8080/api/users/login
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
    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request) {
        try {
            // Obtener el username del usuario autenticado
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            userService.changePassword(username, request);
            return ResponseEntity.ok("Password updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }




    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody CheckTokenRequest checkTokenRequest) {
        boolean isTokenValid = userService.checkToken(checkTokenRequest);
        if (isTokenValid) {
            userService.logout(checkTokenRequest.getToken());  // Simplemente imprime el token
            return ResponseEntity.ok("Sesión cerrada correctamente");
        }
        return ResponseEntity.status(401).body("Token inválido");
    }






}


