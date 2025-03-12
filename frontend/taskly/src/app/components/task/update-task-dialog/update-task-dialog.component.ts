import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../../models/Task';
import { TaskService } from '../../../services/task.service';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/Category';

@Component({
  selector: 'app-update-task-dialog',
  templateUrl: './update-task-dialog.component.html',
  styleUrl: './update-task-dialog.component.scss'
})
export class UpdateTaskDialogComponent {
  taskForm: FormGroup;
  selectedCategories: number[] = []; 
  categories: Category[] = []; 

  constructor(
    public dialogRef: MatDialogRef<UpdateTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private fb: FormBuilder,
    private taskService: TaskService,
    private categoryService: CategoryService
  ) {
    this.taskForm = this.fb.group({
      title: [data.title],
      description: [data.description],
      dueDate: [data.dueDate],
      completed: [data.completed],
      categoryIds: [this.selectedCategories] 
    });
  }

  ngOnInit(): void {
    this.loadCategoriesForTask();
    this.loadAllCategories();
  }

  loadCategoriesForTask(): void {
    this.taskService.getCategoriesForTask(this.data.id).subscribe(categories => {
      console.log('Categorie per la task:', categories);
      this.selectedCategories = categories.map(category => category.id);
      this.taskForm.patchValue({ categoryIds: this.selectedCategories });
    }, error => {
      console.error('Errore nel caricare le categorie per la task:', error);
    });
  }

  loadAllCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      console.log('Categorie disponibili:', categories);
      this.categories = categories;
    }, error => {
      console.error('Errore nel caricare le categorie:', error);
    });
  }

  onSave(): void {
    if (this.taskForm.valid) {
      const updatedTask = { ...this.data, ...this.taskForm.value };
  
      const selectedCategoryIds = this.taskForm.value.categoryIds;
  
      const categoriesToAdd = selectedCategoryIds.filter(
        (categoryId: number) => !this.selectedCategories.includes(categoryId)
      );
  
      const categoriesToRemove = this.selectedCategories.filter(
        (categoryId) => !selectedCategoryIds.includes(categoryId)
      );
  
      updatedTask.categoryIds = selectedCategoryIds;
  
      this.dialogRef.close({ updatedTask, categoriesToAdd, categoriesToRemove });
  
    }
  }
  
  onCancel(): void {
    this.dialogRef.close();
  }

}
