//package com.example.todo_caled.controller;
//
//import com.example.todo_caled.entity.Task;
//import com.example.todo_caled.service.TaskService;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.Optional;
//
//@CrossOrigin(origins = "http://localhost:5173") // React 프론트 연결
//@RestController
//@RequestMapping("/api/tasks")
//public class TaskController {
//
//    private final TaskService taskService;
//
//    public TaskController(TaskService taskService) {
//        this.taskService = taskService;
//    }
//
//    @GetMapping
//    public List<Task> getAllTasks() {
//        return taskService.getAllTasks();
//    }
//
//    @GetMapping("/{id}")
//    public Optional<Task> getTask(@PathVariable Long id) {
//        return taskService.getTaskById(id);
//    }
//
//    @PostMapping
//    public Task createTask(@RequestBody Task task) {
//        return taskService.saveTask(task);
//    }
//
//    @DeleteMapping("/{id}")
//    public void deleteTask(@PathVariable Long id) {
//        taskService.deleteTask(id);
//    }
//}
