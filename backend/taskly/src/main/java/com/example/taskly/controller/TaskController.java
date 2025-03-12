package com.example.taskly.controller;

import com.example.taskly.dto.TaskDTO;
import com.example.taskly.entity.CategoryEntity;
import com.example.taskly.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;


import java.util.*;

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
    public ResponseEntity<Map<String, String>> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Task con ID " + id + " eliminata con successo");
        response.put("taskId", String.valueOf(id));

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(response);
    }

    @GetMapping("/completed/{completed}")
    public ResponseEntity<List<TaskDTO>> getTasksByCompleted(@PathVariable Boolean completed) {
        List<TaskDTO> tasks = taskService.getTasksByCompleted(completed);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @PutMapping("/{taskId}/categories")
    public ResponseEntity<Map<String, String>> addCategoriesToTask(
            @PathVariable("taskId") Long taskId,
            @RequestBody List<Long> categoryIds) {
    
        taskService.addCategoriesToTask(taskId, categoryIds);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Categorie aggiunte correttamente alla task con ID " + taskId);
        response.put("taskId", String.valueOf(taskId));
        response.put("categoryIds", categoryIds.toString());
    
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(response);
    }
    

    @DeleteMapping("/{taskId}/categories/{categoryId}")
    public ResponseEntity<Map<String, String>> removeCategoryFromTask(
            @PathVariable("taskId") Long taskId,
            @PathVariable("categoryId") Long categoryId) {
        
        try {
            taskService.removeCategoryFromTask(taskId, categoryId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Categoria con ID " + categoryId + " rimossa dalla task con ID " + taskId);
            response.put("taskId", String.valueOf(taskId));
            response.put("removedCategoryId", String.valueOf(categoryId));
            
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Errore durante la rimozione della categoria dalla task");
            response.put("error", e.getMessage());

            if (e instanceof org.springframework.dao.DataIntegrityViolationException) {
                response.put("error", "Violazione del vincolo di integrità dei dati: " + e.getMessage());
            } else if (e instanceof org.springframework.web.client.HttpServerErrorException) {
                response.put("error", "Errore del server: " + e.getMessage());
            }
            
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(response);
        }
    }

    @GetMapping("/{taskId}/categories")
    public ResponseEntity<List<CategoryEntity>> getCategoriesForTask(@PathVariable("taskId") Long taskId) {
        List<CategoryEntity> categories = taskService.getCategoriesForTask(taskId);
        return ResponseEntity.ok(categories);
    }


}
