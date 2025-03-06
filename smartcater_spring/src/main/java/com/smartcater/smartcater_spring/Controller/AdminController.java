package com.smartcater.smartcater_spring.Controller;


import com.smartcater.smartcater_spring.Model.Admin;
import com.smartcater.smartcater_spring.Model.ResponseDto;
import com.smartcater.smartcater_spring.Service.AdminService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final AdminService adminService;
    private final JwtUtil jwtUtil;

    public AdminController(AdminService adminService, JwtUtil jwtUtil) {
        this.adminService = adminService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseDto<Admin> adminLogin(@RequestBody Admin request) {
        ResponseDto<Admin> responseDto = new ResponseDto<>();
        responseDto.setData(adminService.loginAdmin(request.getUsername(), request.getPassword()));
        responseDto.setMessage("Login successfully");
        responseDto.setStatusCode(HttpStatus.OK.value());
        return responseDto;
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletResponse response) {
        response.setHeader("Authorization", "");
        return ResponseEntity.ok("Logged out successfully");
    }
}