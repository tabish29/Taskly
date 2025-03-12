package com.example.taskly.service;

import com.example.taskly.dto.TaskDTO;
import com.example.taskly.entity.TaskEntity;
import com.example.taskly.entity.CategoryEntity;
import com.example.taskly.mapper.TaskMapper;
import com.example.taskly.repository.TaskRepository;
import com.example.taskly.repository.CategoryRepository;
import com.example.taskly.exception.ResourceNotFoundException;
import com.example.taskly.exception.DatabaseException;
import com.example.taskly.exception.InvalidRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private TaskMapper taskMapper;

    public TaskDTO createTask(TaskDTO taskDTO) {
        if (taskDTO.getTitle() == null || taskDTO.getTitle().trim().isEmpty()) {
            throw new InvalidRequestException("Il titolo della task non può essere vuoto");
        }

        try {
            TaskEntity taskEntity = taskMapper.taskDTOToTaskEntity(taskDTO);
            TaskEntity savedTask = taskRepository.save(taskEntity);
            return taskMapper.taskEntityToTaskDTO(savedTask);
        } catch (Exception e) {
            throw new DatabaseException("Errore durante il salvataggio della task");
        }
    }

    public List<TaskDTO> getAllTasks() {
        List<TaskEntity> taskEntities = taskRepository.findAll();
        return taskEntities.stream()
                .map(taskMapper::taskEntityToTaskDTO)
                .toList();
    }

    public TaskDTO getTaskById(Long id) {
        Optional<TaskEntity> taskEntity = taskRepository.findById(id);
        if (taskEntity.isEmpty()) {
            throw new ResourceNotFoundException("Task non trovata con ID: " + id);
        }
        return taskMapper.taskEntityToTaskDTO(taskEntity.get());
    }

    public TaskDTO updateTask(Long id, TaskDTO taskDTO) {
        TaskEntity task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task con ID " + id + " non trovata"));

        if (taskDTO.getTitle() == null || taskDTO.getTitle().trim().isEmpty()) {
            throw new InvalidRequestException("Il titolo della task non può essere vuoto");
        }

        task.setTitle(taskDTO.getTitle());
        task.setDescription(taskDTO.getDescription());
        task.setCompleted(taskDTO.getCompleted());
        task.setDueDate(taskDTO.getDueDate());

        TaskEntity updatedTask = taskRepository.save(task);
        return taskMapper.taskEntityToTaskDTO(updatedTask);
    }

    public void deleteTask(Long id) {
        TaskEntity task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task con ID " + id + " non trovata"));

        taskRepository.delete(task);
    }

    public List<TaskDTO> getTasksByCompleted(Boolean completed) {
        List<TaskEntity> taskEntities = taskRepository.findByCompleted(completed);
        return taskEntities.stream()
                .map(taskMapper::taskEntityToTaskDTO)
                .toList();
    }

    public void addCategoriesToTask(Long taskId, List<Long> categoryIds) {
        TaskEntity task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task con ID " + taskId + " non trovato"));

        List<CategoryEntity> categories = categoryRepository.findAllById(categoryIds);

        if (categories.isEmpty() || categories.size() != categoryIds.size()) {
            throw new ResourceNotFoundException("Una o più categorie non sono state trovate.");
        }

        for (CategoryEntity category : categories) {
            if (task.getCategories().contains(category)) {
                throw new InvalidRequestException("Categoria con ID " + category.getId() + " è già associata alla task con ID " + taskId);
            }
        }

        task.getCategories().addAll(categories);

        taskRepository.save(task);
    }

    public void removeCategoryFromTask(Long taskId, Long categoryId) {
        TaskEntity task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task non trovata con ID: " + taskId));

        CategoryEntity category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Categoria non trovata con ID: " + categoryId));

        task.getCategories().remove(category);

        taskRepository.save(task);
    }

    public List<CategoryEntity> getCategoriesForTask(Long taskId) {
        TaskEntity task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task non trovato con ID: " + taskId));

        // Stampa le informazioni della task
        System.out.println("Task trovata: ");
        System.out.println("ID: " + task.getId());
        System.out.println("Titolo: " + task.getTitle());
        System.out.println("Descrizione: " + task.getDescription());
        System.out.println("Completato: " + task.getCompleted());
        System.out.println("Scadenza: " + task.getDueDate());
        // Stampa le categorie associate alla task
        System.out.println("Categorie associate: ");
        if (task.getCategories() != null && !task.getCategories().isEmpty()) {
            for (CategoryEntity category : task.getCategories()) {
                System.out.println("ID Categoria: " + category.getId() + ", Nome: " + category.getName());
            }
        } else {
            System.out.println("Nessuna categoria associata.");
        }
        return task.getCategories();
    }
    

}
