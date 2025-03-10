package com.example.taskly.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.*;

@Entity
@Getter
@Setter
@Table(name = "attivita")
public class TaskEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private Boolean completed;

    @Column(name = "duedate", nullable = false)
    private LocalDateTime dueDate;

    @ManyToMany
    @JoinTable(
            name = "attivita_categoria",
            joinColumns = @JoinColumn(name = "attivita_id"),
            inverseJoinColumns = @JoinColumn(name = "categoria_id")
    )
    private List<CategoryEntity> categories;

}
