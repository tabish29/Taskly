package com.example.taskly.service;

import com.example.taskly.dto.CategoryDTO;
import com.example.taskly.entity.CategoryEntity;
import com.example.taskly.mapper.CategoryMapper;
import com.example.taskly.repository.CategoryRepository;
import com.example.taskly.exception.ResourceNotFoundException;
import com.example.taskly.exception.DatabaseException;
import com.example.taskly.exception.InvalidRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CategoryMapper categoryMapper;

    public CategoryDTO createCategory(CategoryDTO categoryDTO) {
        if (categoryDTO.getName() == null || categoryDTO.getName().trim().isEmpty()) {
            throw new InvalidRequestException("Il nome della categoria non può essere vuoto");
        }

        if (categoryRepository.findByName(categoryDTO.getName()).isPresent()) {
            throw new InvalidRequestException
                    ("La categoria con nome '" + categoryDTO.getName() + "' esiste già.");
        }

        try {
            CategoryEntity categoryEntity = categoryMapper.categoryDTOToCategoryEntity(categoryDTO);
            CategoryEntity savedCategory = categoryRepository.save(categoryEntity);
            return categoryMapper.categoryEntityToCategoryDTO(savedCategory);
        } catch (Exception e) {
            throw new DatabaseException("Errore durante il salvataggio della categoria");
        }
    }

    public List<CategoryDTO> getAllCategories() {

        List<CategoryEntity> categoryEntities = categoryRepository.findAll();
        return categoryEntities.stream()
                .map(categoryMapper::categoryEntityToCategoryDTO)
                .toList();
    }


    public CategoryDTO getCategoryById(Long id) {

        Optional<CategoryEntity> categoryEntity = categoryRepository.findById(id);

        if (categoryEntity.isEmpty()) {
            throw new ResourceNotFoundException("Categoria non trovata con ID: " + id);
        }

        return categoryMapper.categoryEntityToCategoryDTO(categoryEntity.get());
    }



    public CategoryDTO updateCategory(Long id, CategoryDTO categoryDTO) {
        CategoryEntity category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoria con ID " + id + " non trovata"));

        if (categoryDTO.getName() == null || categoryDTO.getName().isEmpty()) {
            throw new InvalidRequestException("Il nome della categoria non può essere vuoto");
        }

        category.setName(categoryDTO.getName());
        CategoryEntity updatedCategory = categoryRepository.save(category);
        return categoryMapper.categoryEntityToCategoryDTO(updatedCategory);
    }

    public void deleteCategory(Long id) {
        CategoryEntity category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoria con ID " + id + " non trovata"));

        categoryRepository.delete(category);
    }
}
