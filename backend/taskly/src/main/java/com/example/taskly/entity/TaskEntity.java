package com.example.taskly.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

import java.time.LocalDate;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Getter
@Setter
@Table(name = "attivita")
public class TaskEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @NotBlank(message = "Il titolo non può essere vuoto")
    @NotEmpty(message = "Il titolo non può essere vuoto")
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private Boolean completed;

    @Column(name = "duedate", nullable = false)
    private LocalDate dueDate;

    @ManyToMany
    @JoinTable(
            name = "attivita_categoria",
            joinColumns = @JoinColumn(name = "attivita_id"),
            inverseJoinColumns = @JoinColumn(name = "categoria_id")
    )
    @JsonManagedReference
    private List<CategoryEntity> categories;

}
