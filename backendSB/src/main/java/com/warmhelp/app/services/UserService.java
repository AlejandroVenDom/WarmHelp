package com.warmhelp.app.services;

import com.warmhelp.app.dtos.auth.CheckTokenRequest;
import com.warmhelp.app.dtos.auth.LoginRequest;
import com.warmhelp.app.dtos.auth.LoginResponse;
import com.warmhelp.app.dtos.auth.RegisterRequest;
import com.warmhelp.app.models.Comments;
import com.warmhelp.app.models.Role;
import com.warmhelp.app.models.User;
import com.warmhelp.app.models.UserInfo;
import com.warmhelp.app.repositories.*;
import com.warmhelp.app.security.JwtUtil;
import jakarta.transaction.Transactional;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
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
    private final UserInfoRepository userInfoRepository;
    private final RoleRepository roleRepository;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final PostsRepository postsRepository;
    private final CommentsRepository commentsRepository;
    private final ResponseCommentsRespository responseCommentsRespository;

    public UserService(UserRepository userRepository,
                       UserInfoRepository userInfoRepository,
                       PostsRepository postsRepository,
                       RoleRepository roleRepository,
                       AuthenticationManager authenticationManager,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil,
                       CommentsRepository commentsRepository,
                       ResponseCommentsRespository responseCommentsRespository) {
        this.userRepository = userRepository;
        this.responseCommentsRespository = responseCommentsRespository;
        this.commentsRepository = commentsRepository;
        this.userInfoRepository = userInfoRepository;
        this.roleRepository = roleRepository;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.postsRepository = postsRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return this.userRepository.findByUsername(username)
                .map(user -> org.springframework.security.core.userdetails.User
                        .withUsername(user.getUsername())
                        .password(user.getPassword())
                        .authorities(user.getRole().getRoleType().name())
                        .build()
                ).orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }

    public List<User> getAllUsers(){
        return this.userRepository.findAll();
    }

    public List<UserInfo> getAllUsersInfo(){
        return this.userInfoRepository.findAll();
    }

    public Optional<User> getUserById(Long id){
        return this.userRepository.findById(id);
    }

    public Optional<UserInfo> getUserInfoById(Long id){
        return this.userInfoRepository.findByUserId(id);
    }

    public Optional<User> findByUsername(String username){
        return this.userRepository.findByUsername(username);
    }

    public Optional<UserInfo> findByUser(User user){
        return this.userInfoRepository.findByUser(user);
    }


    public void changeUsername(Long id, String newUsername) {
        userRepository.updateUsername(id, newUsername);
    }

    @Transactional
    public User createUser(RegisterRequest userFromFront){
        if (this.userRepository.existsByUsername(userFromFront.getUsername())){
            throw new IllegalArgumentException("User alredy exists");
        }
        else {
            Role role = this.roleRepository.findByRoleType(userFromFront.getRoleType()).orElseThrow(
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
            userInfo.setFirst_name(userFromFront.getFirst_name());
            userInfo.setLast_name(userFromFront.getLast_name());
            userInfo.setAddress(userFromFront.getAddress());
            userInfo.setNumber(userFromFront.getNumber());
            userInfo.setMySelf_description(userFromFront.getMySelf_description());
            userInfo.setEmail(userFromFront.getEmail());

            this.userInfoRepository.save(userInfo);
            return user;
        }
    }

    public LoginResponse login(LoginRequest credentials){
        User user = this.userRepository.findByUsername(credentials.getUsername()).orElseThrow(
                () -> new BadCredentialsException("User not found")
        );

        if(!this.passwordEncoder.matches(credentials.getPassword(), user.getPassword())){
            throw new BadCredentialsException("Invalid Password");
        }

        LoginResponse loginData = new LoginResponse();
        loginData.setUsername(credentials.getUsername());
        loginData.setRole(user.getRole().getRoleType());
        loginData.setToken(this.jwtUtil.generateToken(credentials.getUsername()));

        return loginData;
    }

    public boolean checkToken(CheckTokenRequest checkTokenRequest) {
        return this.jwtUtil.validateToken(
                checkTokenRequest.getToken(),
                checkTokenRequest.getUsername()
        );
    }
}
