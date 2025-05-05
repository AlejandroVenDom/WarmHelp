package com.warmhelp.app.dtos.auth;

import com.warmhelp.app.dtosResponses.*;
import com.warmhelp.app.enums.RoleType;
import com.warmhelp.app.models.*;

import java.util.List;

public class LoginResponse {

    /*
     * Retornar al front
     *
     * {
     * token: "sdhgdfsbw435",
     * username: "Camilo",
     * role: "Admin"
     * }
     *
     * */
        private Long id;
        private String token;
        private String username;
        private RoleType role;
        private String first_name;
        private String last_name;
        private String address;
        private String number;
        private String email;
        private String mySelf_description;
        private List<CommentsResponseDTO> comments;
        private List<PostsResponseDTO> posts;
        private List<ProfessionalServiceResponseDTO> professionalServices;
        private List<ReviewResponseDTO> reviews;
        private List<ResponseCommentsResponseDTO> responseComments;
        private List<IncidentResponseDTO> incidents;
        private List<ReportPostDTO> reportPostDTOS;
        private List<ReportServiceResponseDTO> reportServiceResponseDTOS;
        private List<Likes_Posts_ResponseDTO> likesPostsResponseDTOS;
        private List<CartsResponse> cartsResponses;


    public List<Likes_Posts_ResponseDTO> getLikesPostsResponseDTOS() {
        return likesPostsResponseDTOS;
    }

    public List<CartsResponse> getCartsResponses() {
        return cartsResponses;
    }

    public void setCartsResponses(List<CartsResponse> cartsResponses) {
        this.cartsResponses = cartsResponses;
    }

    public void setLikesPostsResponseDTOS(List<Likes_Posts_ResponseDTO> likesPostsResponseDTOS) {
        this.likesPostsResponseDTOS = likesPostsResponseDTOS;
    }

    public List<ReportServiceResponseDTO> getReportServiceResponseDTOS() {
        return reportServiceResponseDTOS;
    }

    public void setReportServiceResponseDTOS(List<ReportServiceResponseDTO> reportServiceResponseDTOS) {
        this.reportServiceResponseDTOS = reportServiceResponseDTOS;
    }

    public List<ReportPostDTO> getReportPostDTOS() {
        return reportPostDTOS;
    }

    public void setReportPostDTOS(List<ReportPostDTO> reportPostDTOS) {
        this.reportPostDTOS = reportPostDTOS;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<ProfessionalServiceResponseDTO> getProfessionalServices() {
        return professionalServices;
    }

    public void setProfessionalServices(List<ProfessionalServiceResponseDTO> professionalServices) {
        this.professionalServices = professionalServices;
    }

    public List<ReviewResponseDTO> getReviews() {
        return reviews;
    }

    public void setReviews(List<ReviewResponseDTO> reviews) {
        this.reviews = reviews;
    }

    public List<ResponseCommentsResponseDTO> getResponseComments() {
        return responseComments;
    }

    public void setResponseComments(List<ResponseCommentsResponseDTO> responseComments) {
        this.responseComments = responseComments;
    }

    public List<CommentsResponseDTO> getComments() {
        return comments;
    }

    public void setComments(List<CommentsResponseDTO> comments) {
        this.comments = comments;
    }

    public List<PostsResponseDTO> getPosts() {
        return posts;
    }

    public void setPosts(List<PostsResponseDTO> posts) {
        this.posts = posts;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public List<IncidentResponseDTO> getIncidents() {
        return incidents;
    }

    public void setIncidents(List<IncidentResponseDTO> incidents) {
        this.incidents = incidents;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMySelf_description() {
        return mySelf_description;
    }

    public void setMySelf_description(String mySelf_description) {
        this.mySelf_description = mySelf_description;
    }

    public String getToken() {
            return token;
        }

        public void setToken(String token) {
            this.token = token;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public RoleType getRole() {
            return role;
        }

        public void setRole(RoleType role) {
            this.role = role;
        }
}
