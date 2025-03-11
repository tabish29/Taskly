import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';


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
    completed: false
  };

  constructor(public dialogRef: MatDialogRef<CreateTaskDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveTask(): void {
    this.dialogRef.close(this.task);
  }

}
