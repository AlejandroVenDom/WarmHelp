package com.warmhelp.app.services;

import com.warmhelp.app.dtos.auth.*;
import com.warmhelp.app.dtosResponses.*;
import com.warmhelp.app.enums.IncidentState;
import com.warmhelp.app.models.*;
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
    private final IncidentRepository incidentRepository;
    private final IncidentStateRepository incidentStateRepository;

    public UserService(UserRepository userRepository, UserInfoRepository userInfoRepository, RoleRepository roleRepository, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder, JwtUtil jwtUtil, PostsRepository postsRepository, CommentsRepository commentsRepository, ResponseCommentsRespository responseCommentsRespository, IncidentRepository incidentRepository, IncidentStateRepository incidentStateRepository) {
        this.userRepository = userRepository;
        this.userInfoRepository = userInfoRepository;
        this.roleRepository = roleRepository;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.postsRepository = postsRepository;
        this.commentsRepository = commentsRepository;
        this.responseCommentsRespository = responseCommentsRespository;
        this.incidentRepository = incidentRepository;
        this.incidentStateRepository = incidentStateRepository;
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
    public UserInfo updateUserInfo(Long id, UpdateUserInfoRequest request){
        UserInfo userInfo = userInfoRepository.findByUserId(id).orElseThrow(
                ()->new IllegalArgumentException("Usuario no encontrado")
        );

        if(!userInfo.getUser().getUsername().equals(request.getUsername())){
            userInfo.getUser().setUsername(request.getUsername());
        }

        userInfo.setFirst_name(request.getFirst_name());
        userInfo.setLast_name(request.getLast_name());
        userInfo.setEmail(request.getEmail());
        userInfo.setNumber(request.getNumber());
        userInfo.setAddress(request.getAddress());
        userInfo.setMySelf_description(request.getMySelf_description());

        userInfoRepository.save(userInfo);
        return userInfo;

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

    public void changePassword(ChangePasswordRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(()-> new UsernameNotFoundException("Usuario no encontrado"));
        if(!passwordEncoder.matches(request.getOldPassword(), user.getPassword())){
            throw new IllegalArgumentException("La contraseña antigua es incorrecta");
        }
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }


    // RESPONSE OF LOGIN FOR REVIEWS
    private ReviewResponseDTO mapToReviewResponseDTIO(Reviews reviews){
        return new ReviewResponseDTO(
                reviews.getId(),
                reviews.getDescription(),
                reviews.getUserInfo().getUser().getUsername(),
                reviews.getCalification().getCalificationType().name(),
                reviews.getCreatedAt()
        );
    }

    // RESPONSE OF LOGIN FOR PROFESSIONAL SERVICES
    private ProfessionalServiceResponseDTO mapToProfessionalServicesResponseDTO(ProfessionalServices professionalServices){
        List<ReviewResponseDTO> reviewResponseDTOS = professionalServices.getReviews()
                .stream()
                .map(this::mapToReviewResponseDTIO)
                .toList();

        List<ReportServiceResponseDTO> reportServiceResponseDTOS = professionalServices.getReports()
                .stream()
                .map(this::mapToReportServicesResponseDTO)
                .toList();

        return new ProfessionalServiceResponseDTO(
                professionalServices.getId(),
                professionalServices.getTitle(),
                professionalServices.getDescription(),
                professionalServices.getPrice(),
                professionalServices.getTax(),
                professionalServices.getUserInfo().getUser().getUsername(),
                professionalServices.getCurrency().getCurrencyType().name(),
                reviewResponseDTOS,
                reportServiceResponseDTOS,
                professionalServices.getCreatedAt(),
                professionalServices.getUpdatedAt(),
                professionalServices.getDeletedAt()
        );
    }

    // RESPONSE OF LOGIN FOR RESPONSE INCIDENTS
    private IncidentResponseDTO mapToProfessionalIncidentsDTO(Incident incident){

        return new IncidentResponseDTO(
                incident.getId(),
                incident.getTitle(),
                incident.getDescription(),
                incident.getType().getIncidentType().name(),
                incident.getState().getIncidentState().name(),
                incident.getUserInfo().getUser().getUsername(),
                incident.getCreatedAt(),
                incident.getUpdatedAt(),
                incident.getDeletedAt()
        );
    }

    // RESPONSE OF LOGIN FOR RESPONSE COMMENTS
    private ResponseCommentsResponseDTO mapToResponseCommentsDTO(ResponseComments rc){
        return new ResponseCommentsResponseDTO(
                rc.getId(),
                rc.getDescription(),
                rc.getUserInfo().getUser().getUsername(),
                rc.getCreatedAt(),
                rc.getUpdatedAt(),
                rc.getDeletedAt()
        );
    }

    // RESPONSE OF LOGIN FOR COMMENTS
    private CommentsResponseDTO mapToCommentsResponseDTO(Comments comments){
        List<ResponseCommentsResponseDTO> responseDTOS = comments.getResponseComments()
                .stream()
                .map(this::mapToResponseCommentsDTO)
                .toList();
        return new CommentsResponseDTO(
                comments.getId(),
                comments.getUserInfo().getUser().getUsername(),
                comments.getDescription(),
                responseDTOS,
                comments.getCreatedAt(),
                comments.getUpdatedAt(),
                comments.getDeletedAt()
        );
    }

    // REPONSE OF LOGIN FOR REPORTS POSTS
    private ReportPostDTO mapToReportPostsResponseDTO(ReportPost reportPost){
        return new ReportPostDTO(
                reportPost.getId(),
                reportPost.getDescription(),
                reportPost.getType().getReportType().name(),
                reportPost.getState().getReportState().name(),
                reportPost.getUserInfo().getUser().getUsername(),
                reportPost.getPost().getId(),
                reportPost.getPost().getTitle(),
                reportPost.getDescription(),
                reportPost.getCreatedAt(),
                reportPost.getUpdatedAt(),
                reportPost.getDeletedAt()
        );
    }

    // RESPONSE OF LOGIN FOR REPORTS SERVICES
    private ReportServiceResponseDTO mapToReportServicesResponseDTO(ReportService reportService){
        return new ReportServiceResponseDTO(
                reportService.getId(),
                reportService.getDescription(),
                reportService.getType().getReportType().name(),
                reportService.getState().getReportState().name(),
                reportService.getUserInfo().getUser().getUsername(),
                reportService.getProfessionalServices().getId(),
                reportService.getProfessionalServices().getTitle(),
                reportService.getProfessionalServices().getDescription(),
                reportService.getCreatedAt(),
                reportService.getUpdatedAt(),
                reportService.getDeletedAt()
        );
    }


    // RESPONSE OF LOGIN FOR POSTS
    private PostsResponseDTO mapToPostsResponseDTO(Posts posts){
        List<CommentsResponseDTO> commentsResponseDTOS = posts.getComments()
                .stream()
                .map(this::mapToCommentsResponseDTO)
                .toList();

        List<ReportPostDTO> reportPostDTOS = posts.getReportPosts()
                .stream()
                .map(this::mapToReportPostsResponseDTO)
                .toList();

        return new PostsResponseDTO(
                posts.getId(),
                posts.getTitle(),
                posts.getUserInfo().getUser().getUsername(),
                posts.getDescription(),
                posts.getImage(),
                commentsResponseDTOS,
                reportPostDTOS,
                posts.getCreatedAt(),
                posts.getUpdatedAt(),
                posts.getDeletedAt()
        );
    }

    // RESPONSE LOGIN AUTH
    public LoginResponse login(LoginRequest credentials){
        User user = this.userRepository.findByUsername(credentials.getUsername()).orElseThrow(
                () -> new BadCredentialsException("User not found")
        );

        if(!this.passwordEncoder.matches(credentials.getPassword(), user.getPassword())){
            throw new BadCredentialsException("Invalid Password");
        }

        UserInfo userInfo = this.userInfoRepository.findByUser(user).orElseThrow(
                () -> new IllegalArgumentException("User info not found")
        );

        LoginResponse loginData = new LoginResponse();
        loginData.setId(user.getId());
        loginData.setUsername(credentials.getUsername());
        loginData.setRole(user.getRole().getRoleType());
        loginData.setToken(this.jwtUtil.generateToken(credentials.getUsername()));
        loginData.setFirst_name(userInfo.getFirst_name());
        loginData.setLast_name(userInfo.getLast_name());
        loginData.setAddress(userInfo.getAddress());
        loginData.setNumber(userInfo.getNumber());
        loginData.setEmail(userInfo.getEmail());
        loginData.setMySelf_description(userInfo.getMySelf_description());



        List<PostsResponseDTO> postsResponseDTOS = userInfo.getPosts()
                .stream()
                .map(this::mapToPostsResponseDTO)
                .toList();
        loginData.setPosts(postsResponseDTOS);



        List<CommentsResponseDTO> commentsResponseDTOS = userInfo.getComments()
                .stream()
                .map(this::mapToCommentsResponseDTO)
                .toList();
        loginData.setComments(commentsResponseDTOS);



        List<ResponseCommentsResponseDTO> responseDTOS = userInfo.getResponseComments()
                .stream()
                .map(this::mapToResponseCommentsDTO)
                .toList();
        loginData.setResponseComments(responseDTOS);



        List<ProfessionalServiceResponseDTO> professionalServiceResponseDTOS = userInfo.getProfessionalServices()
                .stream()
                .map(this::mapToProfessionalServicesResponseDTO)
                .toList();
        loginData.setProfessionalServices(professionalServiceResponseDTOS);



        List<ReviewResponseDTO> reviewResponseDTOS = userInfo.getReviews()
                .stream()
                .map(this::mapToReviewResponseDTIO)
                .toList();
        loginData.setReviews(reviewResponseDTOS);

        List<IncidentResponseDTO> incidentResponseDTOS = userInfo.getIncidents()
                .stream()
                .map(this::mapToProfessionalIncidentsDTO)
                .toList();
        loginData.setIncidents(incidentResponseDTOS);

        List<ReportPostDTO> reportPostDTOS = userInfo.getReportPosts()
                .stream()
                .map(this::mapToReportPostsResponseDTO)
                .toList();
        loginData.setReportPostDTOS(reportPostDTOS);

        List<ReportServiceResponseDTO> reportServiceResponseDTOS = userInfo.getReportServices()
                .stream()
                .map(this::mapToReportServicesResponseDTO)
                .toList();

        loginData.setReportServiceResponseDTOS(reportServiceResponseDTOS);

        return loginData;
    }

    // RESPONSE CHECK TOKEN REQUEST
    public boolean checkToken(CheckTokenRequest checkTokenRequest) {
        return this.jwtUtil.validateToken(
                checkTokenRequest.getToken(),
                checkTokenRequest.getUsername()
        );
    }

    public PublicUserProfileResponse getPublicProfileByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        UserInfo userInfo = userInfoRepository.findByUser(user)
                .orElseThrow(() -> new IllegalArgumentException("Información del usuario no encontrada"));

        PublicUserProfileResponse dto = new PublicUserProfileResponse();
        dto.setUsername(user.getUsername());
        dto.setFirst_name(userInfo.getFirst_name());
        dto.setLast_name(userInfo.getLast_name());
        dto.setEmail(userInfo.getEmail());
        dto.setAddress(userInfo.getAddress());
        dto.setNumber(userInfo.getNumber());
        dto.setMySelf_description(userInfo.getMySelf_description());
        dto.setRole(user.getRole().getRoleType().name());

        dto.setPosts(userInfo.getPosts().stream().map(this::mapToPostsResponseDTO).toList());
        dto.setProfessionalServices(userInfo.getProfessionalServices().stream().map(this::mapToProfessionalServicesResponseDTO).toList());
        dto.setReviews(userInfo.getReviews().stream().map(this::mapToReviewResponseDTIO).toList());
        //dto.setIncidents(userInfo.getIncidents().stream().map(this::mapToProfessionalIncidentsDTO).toList());

        return dto;
    }

}
