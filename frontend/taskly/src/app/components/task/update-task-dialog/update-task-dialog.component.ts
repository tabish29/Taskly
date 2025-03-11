import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../../models/Task';

@Component({
  selector: 'app-update-task-dialog',
  templateUrl: './update-task-dialog.component.html',
  styleUrl: './update-task-dialog.component.scss'
})
export class UpdateTaskDialogComponent {

  taskForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,  
    private fb: FormBuilder
  ) {
    this.taskForm = this.fb.group({
      title: [data.title],  
      description: [data.description],  
      dueDate: [data.dueDate],  
      completed: [data.completed]  
    });
  }

  onSave(): void {
    if (this.taskForm.valid) {
      const updatedTask = { ...this.data, ...this.taskForm.value };
      this.dialogRef.close(updatedTask);
    }
  }

  onCancel(): void {
    this.dialogRef.close(); 
  }

}
