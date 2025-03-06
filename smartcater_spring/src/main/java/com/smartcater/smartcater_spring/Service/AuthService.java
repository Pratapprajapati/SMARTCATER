package com.smartcater.smartcater_spring.Service;

import com.smartcater.smartcater_spring.Controller.JwtUtil;
import com.smartcater.smartcater_spring.Model.User;
import com.smartcater.smartcater_spring.Repo.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    private JwtUtil jwrUtil = new JwtUtil();

    public User registerUser(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent() ||
                userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("User already exists");
        }
        return userRepository.save(user);
    }

    public User loginUser(String userNameOrEmail, String password) {

        try {
            Optional<User> userOptional = userRepository.findByUsername(userNameOrEmail);

            if (!userOptional.isPresent()) {
                userOptional = userRepository.findByEmail(userNameOrEmail);

            }

            if (userOptional.isPresent()) {
                User userDto = userRepository.findUserById(userOptional.get().getId());
                if (userDto.getPassword().equals(password)) {
                    String tokanValue = this.jwrUtil.generateToken(userNameOrEmail);
                    userDto.setToken(this.jwrUtil.generateToken(userNameOrEmail));
                    this.updateUserById(userDto.getId(), userDto);
                    return userDto;
                }
            }

            return null;
        } catch (Exception exception) {
            throw new RuntimeException("User not exist");
        }
    }


    public User updateUserById(String id, User updatedUser) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            existingUser.setUsername(updatedUser.getUsername());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setPassword(updatedUser.getPassword()); // Hash before saving in production
            existingUser.setToken(updatedUser.getToken());
            return userRepository.save(existingUser);
        } else {
            throw new RuntimeException("User not found with ID: " + id);
        }
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public void logoutUser(HttpServletResponse response) {
//        return userRepository.deleteByUsername(userId);
        ResponseCookie expiredCookie = ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .secure(false) // Change to true in production (use true with HTTPS)
                .path("/")
                .maxAge(0) // Immediately expire the cookie
                .build();

        response.addHeader("Set-Cookie", expiredCookie.toString());
    }
}
