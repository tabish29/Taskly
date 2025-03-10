package com.example.taskly.repository;

import com.example.taskly.entity.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<TaskEntity, Long> {

    Optional<TaskEntity> findByTitle(String title);

    List<TaskEntity> findByCompleted(Boolean completed);

}
