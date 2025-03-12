import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Category } from '../../../models/Category';
import { CategoryService } from '../../../services/category.service';


@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrl: './create-task-dialog.component.scss'
})
export class CreateTaskDialogComponent {

  task = {
    title: '',
    description: '',
    dueDate: '',
    completed: false,
    categoryIds: [] as number[]
  };

  categories: Category[] = [];

  constructor(public dialogRef: MatDialogRef<CreateTaskDialogComponent>,  private categoryService: CategoryService) {}


  ngOnInit(): void {
    this.loadCategories();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveTask(): void {
    this.dialogRef.close(this.task);
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

}
