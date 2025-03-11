import { Component } from '@angular/core';
import { Task } from '../../models/Task';
import { TaskService } from '../../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from './create-task-dialog/create-task-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateTaskDialogComponent } from './update-task-dialog/update-task-dialog.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  newTask: Task = new Task(0, '', '', false, '', []); 
  filterStatus: string = '';

  constructor(private taskService: TaskService,private dialog: MatDialog,private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  showErrorSnackbar(message: any): void {
    this.snackBar.open(message, 'Chiudi', {
      duration: 3000,
      panelClass: ['error-snackbar']      
    });
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe(
      (data) => {
        this.tasks = data;
        this.applyFilter();
      },
      (error) => {
        console.error('Errore nel caricamento dei task', error);
        console.log(error.error.message)
      }
    );
  }

  createTask(): void {
    this.taskService.createTask(this.newTask).subscribe(
      (task) => {
        this.tasks.push(task); 
        this.newTask = new Task(0, '', '', false, '', []); 
      },
      (error) => {
        console.error('Errore nella creazione del task', error);
      }
    );
  }

  updateTask(task: Task): void {
    this.taskService.updateTask(task.id,task).subscribe(
      (response) => {
        this.loadTasks();
        console.log('Task aggiornato con successo', response);
        this.showErrorSnackbar('Task aggiornato con successo');    
      },
      (error) => {
        console.error('Errore nell\'aggiornamento del task', error);
      }
    );
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(
      () => {
        this.loadTasks();
        this.showErrorSnackbar('Attività eliminata con successo!');  
      },
      (error) => {
        console.error('Errore nell\'eliminazione del task', error);
      }
    );
  }

  addCategories(taskId: number, categoryIds: number[]): void {
    this.taskService.addCategoriesToTask(taskId, categoryIds).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error('Errore nell\'addizione delle categorie', error);
      }
    );
  }

  removeCategory(taskId: number, categoryId: number): void {
    this.taskService.removeCategoryFromTask(taskId, categoryId).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error('Errore nella rimozione della categoria', error);
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      width: '600px',
      height: '500px',
      backdropClass: 'dialog-backdrop',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.createTask(result).subscribe(
          (response) => {
            console.log('Task aggiunta con successo', response);
            this.loadTasks();
          },
          (error) => {
            console.error('Errore durante l\'aggiunta della task', error);
            this.showErrorSnackbar(error.error.message)
          }
        );
      }
    });
  }

  openUpdateDialog(task: Task): void {
    const dialogRef = this.dialog.open(UpdateTaskDialogComponent, {
      width: '600px',
      height: '500px',
      data: task  
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateTask(result);
      }
    });
  }

  applyFilter(): void {
    if (this.filterStatus === 'completed') {
      this.filteredTasks = this.tasks.filter(task => task.completed);
    } else if (this.filterStatus === 'not-completed') {
      this.filteredTasks = this.tasks.filter(task => !task.completed);
    } else {
      this.filteredTasks = [...this.tasks]; 
    }
  }

}
