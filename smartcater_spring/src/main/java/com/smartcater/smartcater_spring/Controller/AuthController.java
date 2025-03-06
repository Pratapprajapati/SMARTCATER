package com.smartcater.smartcater_spring.Controller;

import com.smartcater.smartcater_spring.Model.Order;
import com.smartcater.smartcater_spring.Model.ResponseDto;
import com.smartcater.smartcater_spring.Model.User;
import com.smartcater.smartcater_spring.Service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User registeredUser = authService.registerUser(user);
            return ResponseEntity.ok(registeredUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseDto<User> login(@RequestBody User user) {
        ResponseDto<User> responseDto = new ResponseDto<>();
        responseDto.setData(authService.loginUser(user.getUsername(), user.getPassword()));
        responseDto.setMessage("Login successfully");
        responseDto.setStatusCode(HttpStatus.OK.value());
        return responseDto;
    }

    @GetMapping("/me")
    public ResponseEntity<?> getUserDetails(@RequestParam String username) {
        Optional<User> user = authService.findByUsername(username);

        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(404).body((User) Map.of("error", "User not found")));
    }

    @GetMapping("/check-auth")
    public boolean checkAuth(@RequestHeader("Authorization") String token) {
        token = token.replace("Bearer ", ""); // Remove 'Bearer ' prefix

        Optional<User> storedToken = authService.findByUsername(jwtUtil.extractUsername(token));

        return storedToken.isPresent() && jwtUtil.validateToken(token, storedToken.get().getUsername());
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletResponse response) {
        authService.logoutUser(response);
        return ResponseEntity.ok("Logged out successfully");
    }
}
