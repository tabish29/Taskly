package com.example.taskly.repository;

import com.example.taskly.entity.TaskEntity;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<TaskEntity, Long> {

    Optional<TaskEntity> findByTitle(String title);

    List<TaskEntity> findByCompleted(Boolean completed);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM attivita_categoria WHERE attivita_id = :taskId AND categoria_id = :categoryId", nativeQuery = true)
    void removeCategoryFromTask(@Param("taskId") Long taskId, @Param("categoryId") Long categoryId);

}
