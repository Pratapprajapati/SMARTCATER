package com.smartcater.smartcater_spring.Service;

import com.smartcater.smartcater_spring.Controller.JwtUtil;
import com.smartcater.smartcater_spring.Model.Admin;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private static final String ADMIN_USERNAME = "admin";
    private static final String ADMIN_PASSWORD = "admin123";
    private JwtUtil jwrUtil = new JwtUtil();

    public Admin loginAdmin(String username, String password) {
        try {
            Admin admin = new Admin();
            if (ADMIN_USERNAME.equals(username) && ADMIN_PASSWORD.equals(password)) {
                admin.setUsername(ADMIN_USERNAME);
                admin.setToken(this.jwrUtil.generateToken(username));
                return admin;
            }
            return admin;
        }
        catch (Exception exception) {
            throw new RuntimeException("User not exist");
        }
    }
}