package com.example.taskly.mapper;

import com.example.taskly.dto.TaskDTO;
import com.example.taskly.entity.TaskEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TaskMapper {

    @Mapping(target = "categories", ignore = true)
    TaskEntity taskDTOToTaskEntity(TaskDTO taskDTO);

    TaskDTO taskEntityToTaskDTO(TaskEntity taskEntity);
}
