package com.warmhelp.app.dtos.auth;

import com.warmhelp.app.enums.RoleType;
import com.warmhelp.app.models.Comments;
import com.warmhelp.app.models.Posts;

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

        private String token;
        private String username;
        private RoleType role;
        private String first_name;
        private String last_name;
        private String address;
        private String number;
        private String email;
        private String mySelf_description;
        private List<Comments> comments;
        private List<Posts> posts;

    public List<Comments> getComments() {
        return comments;
    }

    public void setComments(List<Comments> comments) {
        this.comments = comments;
    }

    public List<Posts> getPosts() {
        return posts;
    }

    public void setPosts(List<Posts> posts) {
        this.posts = posts;
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
