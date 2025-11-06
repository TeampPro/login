package com.example.todo_caled.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.todo_caled.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    boolean existsById(String id);  // 엔티티 User의 id 필드 기준
}
