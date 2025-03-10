package com.example.taskly.mapper;

import com.example.taskly.dto.CategoryDTO;
import com.example.taskly.entity.CategoryEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    CategoryDTO categoryEntityToCategoryDTO(CategoryEntity categoryEntity);

    @Mapping(target = "tasks", ignore = true)
    CategoryEntity categoryDTOToCategoryEntity(CategoryDTO categoryDTO);
}
