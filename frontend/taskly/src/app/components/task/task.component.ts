import { Component } from '@angular/core';
import { Task } from '../../models/Task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

  tasks: Task[] = [];
  newTask: Task = new Task(0, '', '', false, '', []); 

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe(
      (data) => {
        this.tasks = data;
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

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(
      () => {
        this.tasks = this.tasks.filter(task => task.id !== id);  
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
        console.error('Errore nell\'aggiungere categorie', error);
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

}
