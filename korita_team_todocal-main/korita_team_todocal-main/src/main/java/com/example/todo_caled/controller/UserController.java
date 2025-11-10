package com.example.todo_caled.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.todo_caled.entity.User;
import com.example.todo_caled.repository.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // 회원가입 POST
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user) {
        // 이메일 형식 검증
        String email = user.getEmail();
        if (email == null || !email.contains("@") || !email.endsWith(".com")) {
            return ResponseEntity.badRequest().body("유효한 이메일을 입력해주세요. (예: example@email.com)");
        }
        // 아이디 중복 확인
        if (userRepository.existsById(user.getId())) {
            return ResponseEntity.badRequest().body("아이디가 이미 존재합니다.");
        }
        userRepository.save(user);
        return ResponseEntity.ok("회원가입 성공");
    }

    // 회원 전체 조회 GET
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    // 로그인 POST (DB 조회용, 실제 세션/토큰 없음)
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        User found = userRepository.findById(user.getId());
        if (found == null) {
            return ResponseEntity.badRequest().body("등록되지 않은 아이디입니다.");
        }
        if (!found.getPassword().equals(user.getPassword())) {
            return ResponseEntity.badRequest().body("비밀번호가 틀렸습니다.");
        }

        return ResponseEntity.ok("로그인 성공");
    }
}