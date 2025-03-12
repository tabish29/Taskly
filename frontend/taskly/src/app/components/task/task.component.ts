import { Component } from '@angular/core';
import { Task } from '../../models/Task';
import { TaskService } from '../../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from './create-task-dialog/create-task-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateTaskDialogComponent } from './update-task-dialog/update-task-dialog.component';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/Category';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

  tasks: Task[] = [];
  categories: Category[] = [];
  filteredTasks: Task[] = [];
  newTask: Task = new Task(0, '', '', false, '', []); 
  filterStatus: string = '';
  selectedCategory: number | null = null;

  constructor(private taskService: TaskService,private categoryService: CategoryService,private dialog: MatDialog,private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadTasks();
    this.loadCategories();
  }

  showErrorSnackbar(message: any): void {
    this.snackBar.open(message, 'Chiudi', {
      duration: 3000,
      panelClass: ['error-snackbar']      
    });
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe(
      (tasks) => {
        const taskCategoryRequests = tasks.map(task => 
          this.taskService.getCategoriesForTask(task.id).pipe(
            map((categories: Category[]) => {
              task.categories = categories; 
            })
          )
        );
  
        forkJoin(taskCategoryRequests).subscribe(() => {
          this.tasks = tasks; 
          this.applyFilter(); 
        });
      },
      (error) => {
        console.error('Errore nel caricamento dei task', error);
        console.log(error.error.message);
      }
    );
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
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
        console.error('Errore nell\'aggiunta delle categorie', error);
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
        
            // Verifica se ci sono categorie selezionate 
            if (result.categoryIds && result.categoryIds.length > 0) {
              this.taskService.addCategoriesToTask(response.id, result.categoryIds).subscribe(
                () => {
                  console.log('Categorie assegnate alla task con successo',result.categoryIds);
                  this.loadTasks();  
                },
                (error) => {
                  console.error('Errore durante l\'assegnazione delle categorie', error);
                  this.showErrorSnackbar(error.error.message);
                }
              );
            } else {
              this.loadTasks();
            }

          },
          (error) => {
            console.error('Errore durante l\'aggiunta della task', error);
            this.showErrorSnackbar(error.error.message);
          }
        );
      } else{
        console.log("Non sono state inviate le informazioni relative all'attività");
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
        const { updatedTask, categoriesToAdd, categoriesToRemove } = result;

        if (categoriesToRemove.length > 0) {
          categoriesToRemove.forEach((categoryId: number) => {
            console.log("categoria che sto cercando di rimuovere", categoryId);
            this.taskService.removeCategoryFromTask(updatedTask.id, categoryId).subscribe(
              () => {
                console.log('Categoria rimossa con successo',categoryId);
              },
              (error) => {
                console.error('Errore durante la rimozione della categoria', error);
              }
            );
          });
        }
  
        if (categoriesToAdd.length > 0) {
          this.taskService.addCategoriesToTask(updatedTask.id, categoriesToAdd).subscribe(
            () => {
              console.log('Categorie aggiunte con successo', categoriesToAdd);
            },
            (error) => {
              console.error('Errore durante l\'aggiunta delle categorie', error);
            }
          );
        }
  
        
  
        this.updateTask(updatedTask);              
      }
    });
  }

  applyFilter(): void {
    let filteredTasks = [...this.tasks]; 
  
    if (this.filterStatus === 'completed') {
      filteredTasks = filteredTasks.filter(task => task.completed);
    } else if (this.filterStatus === 'not-completed') {
      filteredTasks = filteredTasks.filter(task => !task.completed);
    }
  
    if (this.selectedCategory) {
      filteredTasks = filteredTasks.filter(task => 
        task.categories?.some(category => category.id === this.selectedCategory)
      );
    }
  
    this.filteredTasks = filteredTasks;
  }


}
