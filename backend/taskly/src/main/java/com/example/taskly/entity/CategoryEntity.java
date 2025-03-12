package com.example.taskly.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Getter
@Setter
@Table(name = "categoria")
public class CategoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @ManyToMany(mappedBy = "categories")
    @JsonBackReference
    private List<TaskEntity> tasks;

}


