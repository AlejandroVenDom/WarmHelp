package com.warmhelp.app.dtosResponses;

import java.util.List;

public class PublicUserProfileResponse {
    private String username;
    private String first_name;
    private String last_name;
    private String email;
    private String address;
    private String number;
    private String mySelf_description;
    private String role;

    private List<PostsResponseDTO> posts;
    private List<ProfessionalServiceResponseDTO> professionalServices;
    private List<ReviewResponseDTO> reviews;
//    private List<IncidentResponseDTO> incidents;

    // --- Getters y Setters ---
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public String getMySelf_description() {
        return mySelf_description;
    }

    public void setMySelf_description(String mySelf_description) {
        this.mySelf_description = mySelf_description;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public List<PostsResponseDTO> getPosts() {
        return posts;
    }

    public void setPosts(List<PostsResponseDTO> posts) {
        this.posts = posts;
    }

    public List<ProfessionalServiceResponseDTO> getProfessionalServices() {
        return professionalServices;
    }

    public void setProfessionalServices(List<ProfessionalServiceResponseDTO> professionalServices) {
        this.professionalServices = professionalServices;
    }

//    public List<IncidentResponseDTO> getIncidents() {
//        return incidents;
//    }
//
//    public void setIncidents(List<IncidentResponseDTO> incidents) {
//        this.incidents = incidents;
//    }

    public List<ReviewResponseDTO> getReviews() {
        return reviews;
    }

    public void setReviews(List<ReviewResponseDTO> reviews) {
        this.reviews = reviews;
    }
}
