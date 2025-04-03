package com.tienda.app.services;

import com.tienda.app.dtos.auth.*;
import com.tienda.app.models.Role;
import com.tienda.app.models.User;

import com.tienda.app.models.UserInfo;
import com.tienda.app.repositories.RoleRepository;
import com.tienda.app.repositories.UserInfoRepository;
import com.tienda.app.repositories.UserRepository;
import com.tienda.app.security.JwtUtil;
import jakarta.transaction.Transactional;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserInfoRepository userInfoRepository;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public UserService(UserRepository userRepository, RoleRepository roleRepository,
                       UserInfoRepository userInfoRepository, AuthenticationManager authenticationManager,
                       PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.userInfoRepository = userInfoRepository;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return this.userRepository.findByUsername(username)
                .map(user -> org.springframework.security.core.userdetails.User
                        .withUsername(user.getUsername())
                        .password(user.getPassword())
                        .authorities(user.getRole().getRoleName().name())
                        .build()
                ).orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }


    public List<User> getAllUsers() {
        return this.userRepository.findAll();
    }

    public Optional<User> getUserById(long id) {
        return this.userRepository.findById(id);
    }

    public Optional<User> findByUsername(String username) {
        return this.userRepository.findByUsername(username);
    }

    public void deleteUserById(long id) {
        this.userRepository.deleteById(id);
    }

    @Transactional
    public User createUser(RegisterRequest userFromFront) {

        if (this.userRepository.existsByUsername(userFromFront.getUsername())) {
            throw new IllegalArgumentException("User already exists");
        }

        else {
            Role role = this.roleRepository.findByRoleName(userFromFront.getRoleName()).orElseThrow(
                    () -> new IllegalArgumentException("Role no permitido")
            );

            User user = new User();
            user.setUsername(userFromFront.getUsername());
            user.setPassword(
                    this.passwordEncoder.encode(userFromFront.getPassword())
            );
            user.setRole(role);
            user = this.userRepository.save(user);

            UserInfo userInfo = new UserInfo();
            userInfo.setUser(user);
            userInfo.setFirstName(userFromFront.getFirstName());
            userInfo.setLastName(userFromFront.getLastName());
            userInfo.setAddress(userFromFront.getAddress());

            this.userInfoRepository.save(userInfo);
            return user;
        }

    }


    public LoginResponse login(LoginRequest credentials) {
        // Comprobamos si el usuario existe
        User user = this.userRepository.findByUsername(credentials.getUsername()).orElseThrow(
                () -> new BadCredentialsException("User not found")
        );

        // Comprobamos si la contraseña no coincide con la que tenemos en la base de datos
        if (!this.passwordEncoder.matches(credentials.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Invalid password");
        }

        UserInfo userInfo = this.userInfoRepository.findByUserId(user.getId()).orElse(new UserInfo());

        LoginResponse loginData = new LoginResponse();
        loginData.setUsername(credentials.getUsername());
        loginData.setRole(user.getRole().getRoleName());
        loginData.setFirstName(userInfo.getFirstName());
        loginData.setLastName(userInfo.getLastName());
        loginData.setAddress(userInfo.getAddress());
        loginData.setToken(this.jwtUtil.generateToken(credentials.getUsername()));

        return loginData;
    }

    public boolean checkToken(CheckTokenRequest checkTokenRequest) {
        return this.jwtUtil.validateToken(
                checkTokenRequest.getToken(),
                checkTokenRequest.getUsername()
        );
    }
    @Transactional
    public void changePassword(String username, ChangePasswordRequest request) {
        // Obtener usuario de la BD
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Depuración: Verificar qué valores están llegando
        System.out.println("Usuario autenticado: " + username);
        System.out.println("Contraseña actual ingresada (texto plano): " + request.getCurrentPassword());
        System.out.println("Contraseña en BD (encriptada): " + user.getPassword());

        // Validar que la contraseña actual ingresada coincida con la almacenada
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Current password is incorrect");
        }

        // Validar que las nuevas contraseñas coincidan
        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("New passwords do not match");
        }

        // Encriptar la nueva contraseña antes de guardarla en la base de datos
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        System.out.println("Contraseña actualizada correctamente para el usuario: " + username);
    }



    public void logout(String token) {
        // No se puede invalidar un JWT directamente, pero puedes implementarlo si llevas un control de tokens.
        System.out.println("Logout: Token recibido -> " + token);
    }




}




