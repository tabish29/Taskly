package com.example.taskly.controller;

import com.example.taskly.dto.TaskDTO;
import com.example.taskly.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<List<TaskDTO>> getAllTasks() {
        List<TaskDTO> tasks = taskService.getAllTasks();
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskDTO> getTaskById(@PathVariable("id") Long id) {
        TaskDTO task = taskService.getTaskById(id);
        return new ResponseEntity<>(task, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<TaskDTO> createTask(@RequestBody TaskDTO taskDTO) {
        TaskDTO createdTask = taskService.createTask(taskDTO);
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskDTO> updateTask(
            @PathVariable("id") Long id,
            @RequestBody TaskDTO taskDTO) {
        TaskDTO updatedTask = taskService.updateTask(id, taskDTO);
        return new ResponseEntity<>(updatedTask, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok("Task ID " + id + " eliminata con successo");
    }

    @GetMapping("/completed/{completed}")
    public ResponseEntity<List<TaskDTO>> getTasksByCompleted(@PathVariable Boolean completed) {
        List<TaskDTO> tasks = taskService.getTasksByCompleted(completed);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @PutMapping("/{taskId}/categories")
    public ResponseEntity<String> addCategoriesToTask(@PathVariable("taskId") Long taskId,
                                                      @RequestBody List<Long> categoryIds) {
            taskService.addCategoriesToTask(taskId, categoryIds);
            return ResponseEntity.ok("Categorie aggiunte correttamente alla task con ID " + taskId);

    }

    @DeleteMapping("/{taskId}/categories/{categoryId}")
    public ResponseEntity<String> removeCategoryFromTask(@PathVariable("taskId") Long taskId,
                                                         @PathVariable("categoryId") Long categoryId) {
        try {
            taskService.removeCategoryFromTask(taskId, categoryId);
            return ResponseEntity.ok("Categoria con ID " + categoryId + " rimossa dalla task con ID " + taskId);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Errore durante la rimozione della categoria dalla task");
        }
    }

}
