package com.warmhelp.app.dtos.auth;

import com.warmhelp.app.enums.RoleType;

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
