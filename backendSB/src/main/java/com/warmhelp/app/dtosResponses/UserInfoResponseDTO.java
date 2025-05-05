package com.warmhelp.app.dtosResponses;

public class UserInfoResponseDTO {
    private Long idUser;
    private Long idUserInfo;
    private String username;
    private String first_name;
    private String last_name;
    private String address;
    private String number;
    private String email;
    private String mySelf_description;
    private String roleType;

    public UserInfoResponseDTO(Long idUser, Long idUserInfo, String username, String first_name, String last_name, String address, String number, String email, String mySelf_description, String roleType) {
        this.idUser = idUser;
        this.idUserInfo = idUserInfo;
        this.username = username;
        this.first_name = first_name;
        this.last_name = last_name;
        this.address = address;
        this.number = number;
        this.email = email;
        this.mySelf_description = mySelf_description;
        this.roleType = roleType;
    }

    public String getRoleType() {
        return roleType;
    }

    public void setRoleType(String roleType) {
        this.roleType = roleType;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    public Long getIdUserInfo() {
        return idUserInfo;
    }

    public void setIdUserInfo(Long idUserInfo) {
        this.idUserInfo = idUserInfo;
    }

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
}
